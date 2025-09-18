export function scrollToField(fieldName: string) {
  const el = document.querySelector<HTMLElement>(`[data-field="${fieldName}"]`);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  const focusable = el.querySelector<HTMLElement>(
    "input, select, textarea, [tabindex]:not([tabindex='-1'])"
  );
  focusable?.focus();
}
