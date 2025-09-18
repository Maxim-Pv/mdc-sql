// src/lib/analytics/mailru.ts
export function pushMailruGoal(goal: string, payload?: Record<string, any>) {
  if (typeof window === "undefined") return;
  const ids: string[] = (window as any).__mailruIds || [];
  if (!Array.isArray(ids) || !ids.length) return;
  (window as any)._tmr = (window as any)._tmr || [];
  ids.forEach((id) =>
    (window as any)._tmr.push({ id, type: "reachGoal", goal, ...payload })
  );
}
