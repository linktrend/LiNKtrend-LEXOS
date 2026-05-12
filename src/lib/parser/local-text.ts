import type { ParserAdapter, ParserRequest, ParserResult } from "@/lib/parser/types";

function utf8Decode(buf: Uint8Array): string {
  try {
    return new TextDecoder("utf-8", { fatal: false }).decode(buf);
  } catch {
    return "";
  }
}

export function createLocalTextAdapter(): ParserAdapter {
  return {
    id: "local_text",
    async parse(req: ParserRequest): Promise<ParserResult | null> {
      const c = req.classification;
      if (c !== "digital_text_document") return null;

      const text = utf8Decode(req.buffer);
      const lines = text.split(/\r?\n/);
      const structuredJson: Record<string, unknown> = {
        version: 1,
        kind: "text_extraction",
        lineCount: lines.length,
        byteLength: req.buffer.length,
        warnings: [] as string[],
      };

      const markdown =
        text.length > 0
          ? `## Extracted text\n\n${text}`
          : "## Extracted text\n\n_(empty file)_";

      return {
        markdown,
        structuredJson,
        extractionType: "text_document",
        detectedLanguage: null,
        qualityFlags: ["pre_qa_unverified"],
        limitations: ["WP-08 QA comparator not run; do not treat as accepted final extraction."],
        extractionTool: "local_utf8",
        extractionModel: null,
        isPlaceholder: false,
      };
    },
  };
}
