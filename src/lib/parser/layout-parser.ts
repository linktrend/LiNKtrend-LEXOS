import type { ParserAdapter, ParserRequest, ParserResult } from "@/lib/parser/types";

const DEFAULT_PARSE_BASE = "https://api.cloud.llamaindex.ai";

/**
 * Optional layout-aware parse via LlamaParse-compatible API (v1 upload + job poll).
 * Returns null if not configured, wrong classification, or any failure (caller falls back to placeholder).
 */
export function createLayoutParserAdapter(): ParserAdapter {
  return {
    id: "layout_http",
    async parse(req: ParserRequest): Promise<ParserResult | null> {
      const apiKey = process.env.PARSER_API_KEY?.trim();
      const provider = (process.env.PARSER_PROVIDER ?? "").trim().toLowerCase();
      if (!apiKey) return null;
      if (provider && provider !== "llamaparse" && provider !== "llama_cloud") return null;

      const c = req.classification;
      if (c !== "pdf_digital" && c !== "pdf_scanned_or_mixed" && c !== "docx") {
        return null;
      }

      const base = (process.env.PARSER_API_BASE_URL ?? DEFAULT_PARSE_BASE).replace(/\/$/, "");
      const uploadUrl = `${base}/api/v1/parsing/upload`;

      const form = new FormData();
      const blob = new Blob([Buffer.from(req.buffer)], {
        type: req.mimeType || "application/octet-stream",
      });
      form.append("file", blob, req.fileName);

      let jobId: string;
      try {
        const up = await fetch(uploadUrl, {
          method: "POST",
          headers: { Authorization: `Bearer ${apiKey}` },
          body: form,
        });
        if (!up.ok) return null;
        const upJson = (await up.json()) as { id?: string };
        if (!upJson.id) return null;
        jobId = upJson.id;
      } catch {
        return null;
      }

      const deadline = Date.now() + 25_000;
      let markdown = "";
      let status = "PENDING";
      while (Date.now() < deadline) {
        try {
          const st = await fetch(`${base}/api/v1/parsing/job/${jobId}`, {
            headers: { Authorization: `Bearer ${apiKey}` },
          });
          if (!st.ok) break;
          const sj = (await st.json()) as { status?: string; markdown?: string };
          status = sj.status ?? status;
          if (sj.markdown) markdown = sj.markdown;
          if (status === "SUCCESS" || status === "COMPLETED") break;
          if (status === "ERROR" || status === "FAILED") return null;
        } catch {
          return null;
        }
        await new Promise((r) => setTimeout(r, 800));
      }

      if (!markdown) return null;

      const structuredJson: Record<string, unknown> = {
        version: 1,
        kind: "layout_parser",
        jobId,
        finalStatus: status,
        warnings: ["pre_qa_unverified", "layout_parser"],
      };

      return {
        markdown,
        structuredJson,
        extractionType: c === "pdf_scanned_or_mixed" ? "scanned_document" : "text_document",
        detectedLanguage: null,
        qualityFlags: ["pre_qa_unverified", "layout_parser"],
        limitations: ["WP-08 QA not run; image/screenshot PDFs may still need human review per W4 rules."],
        extractionTool: "llama_cloud_parsing",
        extractionModel: null,
        isPlaceholder: false,
      };
    },
  };
}
