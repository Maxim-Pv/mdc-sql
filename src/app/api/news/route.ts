// import { ContentItem } from "@/types/news";
// import { NextRequest } from "next/server";
// import news from "~/data/eventNews.json";

// type Kind = "news" | "events" | "all";

// export const dynamic = "force-dynamic";

// export async function GET(req: NextRequest) {
//   const url = new URL(req.url);
//   const page = Math.max(1, Number(url.searchParams.get("page") ?? "1"));
//   const limit = Math.min(50, Math.max(1, Number(url.searchParams.get("limit") ?? "6")));
//   const kind = (url.searchParams.get("kind") as Kind) || "news";

//   let items = (news as ContentItem[]).filter((n) => n.published !== false);
//   if (kind !== "all") {
//     items = items.filter((n) => n.kind === kind);
//   }

//   // сортировка: для events учитываем startISO/dateISO/endISO; для news — dateISO
//   const sortKey = (it: ContentItem) => it.startISO ?? it.dateISO ?? it.endISO ?? "0000-01-01";

//   items.sort((a, b) => (sortKey(a) < sortKey(b) ? 1 : -1));

//   const total = items.length;
//   const start = (page - 1) * limit;
//   const slice = items.slice(start, start + limit);

//   return Response.json({
//     items: slice,
//     total,
//     page,
//     limit,
//     hasMore: start + limit < total,
//   });
// }
