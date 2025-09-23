export function reachYmGoal(goal: string, params?: Record<string, any>) {
  if (typeof window === 'undefined') return;
  const idRaw = process.env.NEXT_PUBLIC_YM_ID;
  const id = idRaw ? parseInt(idRaw, 10) : NaN;
  const ym = (window as any).ym as ((id: number, cmd: string, goal: string, p?: any) => void) | undefined;
  if (!ym || !id) return;
  try {
    if (params) ym(id, 'reachGoal', goal, params);
    else ym(id, 'reachGoal', goal);
  } catch {
    /* no-op */
  }
}
