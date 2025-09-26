// import { PvzCommon } from "@/types/delivery";
// import { useCallback, useEffect, useState } from "react";

// export function usePostDelivery(initialCityName = "Москва") {
//   const [cityName, setCityName] = useState(initialCityName);
//   const [postCityId, setPostCityId] = useState<string>("");   // если нужен
//   const [offices, setOffices] = useState<PvzCommon[]>([]);
//   const [options, setOptions] = useState<{label:string;value:string}[]>([]);
//   const [selectedPvz, setSelectedPvz] = useState<string>("");

//   const resolveCity = useCallback(async (name: string) => {
//     // пример: /api/post/cities?q=<name> → берёшь id
//     const r = await fetch(`/api/post/cities?q=${encodeURIComponent(name)}`);
//     const j = await r.json();
//     const id = j?.[0]?.id ?? "";
//     setPostCityId(id);
//     return id || name; // на худой конец можно ходить по name
//   }, []);

//   const loadOffices = useCallback(async (nameOrId: string) => {
//     const r = await fetch(`/api/post/offices?city=${encodeURIComponent(nameOrId)}`);
//     const data = await r.json();
//     const normalized: PvzCommon[] = (Array.isArray(data) ? data : []).map((p: any) => ({
//       code: String(p.code || p.id),
//       name: p.name,
//       work_time: p.hours,
//       location: {
//         latitude: p.lat,
//         longitude: p.lng,
//         address_full: p.address_full || p.address,
//         address: p.address,
//       },
//     }));
//     setOffices(normalized);
//     setOptions(normalized.map(p => ({
//       label: `${p.location.address_full || p.location.address} (${p.code})`,
//       value: p.code,
//     })));
//   }, []);

//   useEffect(() => {
//     (async () => {
//       const idOrName = await resolveCity(cityName); // вернёт id, если есть
//       await loadOffices(idOrName);
//       setSelectedPvz("");
//     })();
//   }, [cityName, resolveCity, loadOffices]);

//   return {
//     cityName, setCityName,
//     postCityId,
//     offices, options,
//     selectedPvz, setSelectedPvz,
//   };
// }
