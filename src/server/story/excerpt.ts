/** First markdown block excerpt for deterministic "prefill from story" (WP-10, no LLM). */
export function firstStoryParagraphExcerpt(markdown: string | null, maxLen = 480): string | null {
  if (!markdown?.trim()) return null;
  const raw = markdown.trim();
  const firstBlock = raw.split(/\n\s*\n/)[0] ?? raw;
  const singleLine = firstBlock.replace(/\s+/g, " ").trim();
  if (singleLine.length <= maxLen) return singleLine;
  return `${singleLine.slice(0, maxLen)}…`;
}
