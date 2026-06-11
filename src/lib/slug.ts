/** Build a URL-safe slug from first + surname (e.g. "John Doe" -> "john-doe") */
export function createGuestSlug(firstName: string, surname: string): string {
  const raw = `${firstName.trim()}-${surname.trim()}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return raw || "guest";
}

export function ensureUniqueSlug(baseSlug: string, existingSlugs: string[]): string {
  if (!existingSlugs.includes(baseSlug)) return baseSlug;
  let counter = 2;
  while (existingSlugs.includes(`${baseSlug}-${counter}`)) counter++;
  return `${baseSlug}-${counter}`;
}

function titleCase(value: string): string {
  return value
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

/** Fallback: derive a display name from slug when storage lookup fails */
export function decodeGuestSlug(slug: string): { firstName: string; surname: string } | null {
  const normalized = slug.toLowerCase().replace(/-\d+$/, "");
  const dash = normalized.indexOf("-");
  if (dash <= 0) return null;

  return {
    firstName: titleCase(normalized.slice(0, dash)),
    surname: titleCase(normalized.slice(dash + 1)),
  };
}