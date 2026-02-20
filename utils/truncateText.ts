export function truncateText(text: string, maxLength: number): string {
  if (!text) return "";

  if (text.length <= maxLength) return text;

  const trimmed = text.slice(0, maxLength);
  return trimmed.slice(0, trimmed.lastIndexOf(" ")) + "...";
}
