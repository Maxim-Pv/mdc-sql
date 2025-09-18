export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date_req = searchParams.get("date_req") || "";
  const url = `https://www.cbr.ru/scripts/XML_daily.asp${
    date_req ? `?date_req=${date_req}` : ""
  }`;

  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();

    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=windows-1251",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Ошибка получения данных с cbr.ru" }),
      {
        status: 500,
      }
    );
  }
}
