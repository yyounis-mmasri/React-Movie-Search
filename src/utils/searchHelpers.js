export const sanitizeQuery = (q) => (q ?? '').replace(/^=+/, '').trim();
export const clampPage = (p, max = Infinity) => {
  const n = Number(p) || 1;
  const clamped = Math.max(1, Math.trunc(n));
  return Number.isFinite(max) ? Math.min(clamped, max) : clamped;
};

export const makeSetSafeParams = (setSearchParams) => (q, p = 1) => {
  const cleanQ = sanitizeQuery(q);
  const cleanP = clampPage(p);
  setSearchParams({ q: cleanQ, page: String(cleanP) });
};
export const scrollToTopSmooth = () =>
  window.scrollTo({ top: 0, behavior: 'smooth' });
