import { NextResponse } from "next/server";

type Params = { officeId: string; date: string };
export async function POST(
  request: Request,
  { params }: { params: Promise<Params> }
) {
  const { officeId, date } = await params;

  if (!officeId || !date) {
    return NextResponse.json(
      { error: "Отсутствуют параметры officeId или date" },
      { status: 400 }
    );
  }

  const safeDate = decodeURIComponent(date);

  try {
    const res = await fetch(
      `https://clients.anykey.pro/mdcards/forms/resource/booking/${officeId}/${safeDate}`,
      {
        method: "POST",
        cache: "no-store", // всегда свежие данные
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: process.env.API_TOKEN }),
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Ошибка загрузки слотов" },
        { status: 500 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Серверная ошибка" }, { status: 500 });
  }
}
