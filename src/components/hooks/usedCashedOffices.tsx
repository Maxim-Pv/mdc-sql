import { useState, useEffect } from "react";
import { fetchOffices } from "@/lib/api";
import { Office } from "@/types/office";

const OFFICE_CACHE_KEY = "cached_offices";
const OFFICE_CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours

export const useCachedOffices = () => {
  const [offices, setOffices] = useState<Office[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const cached = localStorage.getItem(OFFICE_CACHE_KEY);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < OFFICE_CACHE_TTL) {
            setOffices(data);
            setLoading(false);
            return;
          }
        }

        const fresh = await fetchOffices();
        setOffices(fresh);
        localStorage.setItem(
          OFFICE_CACHE_KEY,
          JSON.stringify({ data: fresh, timestamp: Date.now() })
        );
      } catch (e) {
        setError("Не удалось загрузить офисы");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { offices, loading, error };
};
