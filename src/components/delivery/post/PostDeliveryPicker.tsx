// import { usePostDelivery } from "@/components/hooks/delivery/usePostDelivery";
// import { useEffect } from "react";
// import CitySelect from "../cdek/CitySelect";
// import CustomSelect from "@/components/ui/inputs/customSelect/CustomSelect";
// import YandexPvzMap from "../YMapPvz";

// export function PostDeliveryPicker({
//   valuePvz,
//   onChangeCity,
//   onChangePvz,
// }: {
//   valuePvz: string;
//   onChangeCity: (name: string) => void; // для формы: setValue("region", name)
//   onChangePvz: (code: string, address?: string) => void;
// }) {
//   const post = usePostDelivery("Москва");

//   useEffect(() => {
//     if (valuePvz !== post.selectedPvz) post.setSelectedPvz(valuePvz || "");
//   }, [valuePvz]);

//   return (
//     <div className="space-y-3">
//       <CitySelect
//         value={post.cityName}
//         onChange={(_, name) => {
//           post.setCityName(name);
//           onChangeCity(name);
//         }}
//       />

//       <CustomSelect
//         name="pvz"
//         value={post.selectedPvz}
//         options={post.options}
//         placeholder="Отделение"
//         onValueChange={(code) => {
//           const pvz = post.offices.find((p) => p.code === code);
//           const addr = pvz?.location?.address_full || pvz?.location?.address || "";
//           post.setSelectedPvz(code);
//           onChangePvz(code, addr);
//         }}
//       />

//       <YandexPvzMap
//         cityName={post.cityName}
//         offices={post.offices}
//         selectedPvzCode={post.selectedPvz}
//         onPick={(p: any) => {
//           const code = String(p.code);
//           const addr = p?.location?.address_full || p?.location?.address || "";
//           post.setSelectedPvz(code);
//           onChangePvz(code, addr);
//         }}
//         height={360}
//       />
//     </div>
//   );
// }
