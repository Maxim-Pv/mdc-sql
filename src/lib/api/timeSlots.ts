export async function fetchTimeSlots(
  officeId: string,
  date: string
): Promise<string[]> {
  const res = await fetch(`/api/booking/${officeId}/${date}`, {
    method: "POST",
    cache: "no-store", // на случай агресивного кэширования браузера
  });

  if (!res.ok) {
    throw new Error("Не удалось получить слоты времени");
  }

  return res.json();
}
