import { NextResponse } from "next/server";
import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";

const BASE_URL =
  "https://www.banki.ru/products/currencyNodejsApi/getBanksOrExchanges";
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";
const DEFAULT_BANK_ID = "122250";
const DEVICE_ID = "7e2fb2a9-9c4d-4c64-bb85-4becea7496df";

type UpstreamResponse = {
  list: Array<{ name: string; exchange: { buy: number; sale: number } }>;
};
type SimpleOffice = { address: string; buy: number; sale: number };

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawBankId = searchParams.get("bankId") || "";
  const bankId =
    /^\d+$/.test(rawBankId) && rawBankId !== "" ? rawBankId : DEFAULT_BANK_ID;
  const rawAmount = searchParams.get("amount") || "1";

  const amount = /^\d+$/.test(rawAmount) ? rawAmount : "1";

  const jar = new CookieJar();

  jar.setCookieSync(
    `device_id=${DEVICE_ID}; Domain=banki.ru; Path=/`,
    BASE_URL
  );
  const client = wrapper(
    axios.create({
      jar,
      withCredentials: true,

      maxRedirects: 10,
      timeout: 20_000,
    })
  );

  // параметры запроса
  const params = new URLSearchParams({
    regionUrl: "moskva",
    currencyId: "498", // MDL
    bankId,
    amount,
    isExchangeOffices: "1",
  });
  const upstreamUrl = `${BASE_URL}?${params}`;

  try {
    // добавляем retry: максимум 2 попытки
    let res;
    let lastErr: any;
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        res = await client.get<UpstreamResponse>(upstreamUrl, {
          headers: {
            Accept: "application/json, text/plain, */*",
            "X-Requested-With": "XMLHttpRequest",
            Referer: "https://www.banki.ru/products/currency/?currencyId=498",
            Origin: "https://www.banki.ru",
            "User-Agent": USER_AGENT,
          },
        });
        break; // успех — выходим из цикла
      } catch (err: any) {
        lastErr = err;
        console.warn(`Attempt ${attempt} failed:`, err.message);
        if (attempt === 2) throw err; // после 2-й попытки пробрасываем ошибку
      }
    }

    const data = res!.data;
    if (!data?.list || !Array.isArray(data.list)) {
      throw new Error("Некорректный ответ от banki.ru");
    }
    const out: SimpleOffice[] = data.list.map((o) => ({
      address: o.name,
      buy: o.exchange.buy,
      sale: o.exchange.sale,
    }));

    return new NextResponse(JSON.stringify(out), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  } catch (err: any) {
    console.error("Upstream fetch error:", err.response?.status, err.message);
    const status =
      err.response?.status >= 400 && err.response?.status < 600 ? 502 : 500;
    const message = err.response?.data?.error || err.message || "Bad Gateway";
    return NextResponse.json({ error: message }, { status });
  }
}
