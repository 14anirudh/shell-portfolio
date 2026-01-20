export const DEFAULT_MAX_LINE_WIDTH = 120;

export const nbsp = (n: number) => "&nbsp;".repeat(Math.max(0, n));

export const wrapWords = (text: string, maxWidth: number): string[] => {
  const cleaned = String(text ?? "").trim();
  if (!cleaned) return [""];
  if (maxWidth <= 0) return [cleaned];

  const words = cleaned.split(/\s+/);
  const lines: string[] = [];
  let curr = "";

  for (const word of words) {
    if (!curr) {
      // Hard-break very long words
      if (word.length <= maxWidth) {
        curr = word;
      } else {
        for (let i = 0; i < word.length; i += maxWidth) {
          lines.push(word.slice(i, i + maxWidth));
        }
        curr = "";
      }
      continue;
    }

    if (curr.length + 1 + word.length <= maxWidth) {
      curr += " " + word;
    } else {
      lines.push(curr);
      if (word.length <= maxWidth) {
        curr = word;
      } else {
        for (let i = 0; i < word.length; i += maxWidth) {
          lines.push(word.slice(i, i + maxWidth));
        }
        curr = "";
      }
    }
  }

  if (curr) lines.push(curr);
  return lines.length ? lines : [cleaned];
};

