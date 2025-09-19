// import { ContentItem } from "@/types/news";
// import data from "~/data/eventNews.json";

// export const dynamic = "force-dynamic";

// export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
//   const { id: raw } = await params;
//   const id = decodeURIComponent(raw);

//   const list = (data as ContentItem[]).filter(Boolean);
//   const item = list.find((n) => n.id === id && n.published !== false);

//   if (!item) {
//     return new Response(JSON.stringify({ error: "Not found" }), {
//       status: 404,
//       headers: { "Content-Type": "application/json; charset=utf-8" },
//     });
//   }

//   return new Response(JSON.stringify(item), {
//     status: 200,
//     headers: { "Content-Type": "application/json; charset=utf-8" },
//   });
// }
