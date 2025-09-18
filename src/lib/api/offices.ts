import { Office } from "@/types/office";

export const fetchOffices = async (): Promise<Office[]> => {
  const res = await fetch("/api/offices", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Ошибка загрузки офисов");
  }

  return res.json();
};
