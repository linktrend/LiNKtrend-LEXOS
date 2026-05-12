import type { ParserAdapter, ParserRequest, ParserResult } from "@/lib/parser/types";

function basePlaceholder(
  req: ParserRequest,
  reason: "parser_unavailable" | "unsupported_media" | "parser_failed" | "file_too_large",
  extraLimitations: string[] = []
): ParserResult {
  const structuredJson: Record<string, unknown> = {
    version: 1,
    kind: "lexos_placeholder",
    reason,
    classification: req.classification,
    fileName: req.fileName,
    byteLength: req.buffer.length,
    parserConfigured: Boolean(process.env.PARSER_API_KEY?.trim()),
    limitations: [
      "No layout-aware extraction was performed for this file in WP-07.",
      ...extraLimitations,
    ],
  };

  const markdown = `## Extraction not performed

This record is a **controlled placeholder** (WP-07). LEXOS did **not** extract the substantive contents of the original file.

- **Reason:** ${reason}
- **Classification:** ${req.classification}
- **File:** ${req.fileName}

Do not rely on this artifact for assertions until a real extraction is produced and reviewed (WP-08+).
`;

  const extractionType: ParserResult["extractionType"] = "metadata_only";

  return {
    markdown,
    structuredJson,
    extractionType,
    detectedLanguage: null,
    qualityFlags: [reason === "parser_failed" ? "parser_failed" : "parser_unavailable"],
    limitations: structuredJson.limitations as string[],
    extractionTool: "none",
    extractionModel: null,
    isPlaceholder: true,
  };
}

export function createPlaceholderAdapter(): ParserAdapter {
  return {
    id: "placeholder",
    async parse(req: ParserRequest): Promise<ParserResult | null> {
      return basePlaceholder(req, "parser_unavailable");
    },
  };
}

export function createForcedPlaceholderAdapter(
  reason: "parser_unavailable" | "unsupported_media" | "parser_failed" | "file_too_large"
): ParserAdapter {
  return {
    id: `forced_${reason}`,
    async parse(req: ParserRequest): Promise<ParserResult | null> {
      return basePlaceholder(req, reason);
    },
  };
}
