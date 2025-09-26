export type PvzCommon = {
  code: string;
  name?: string;
  work_time?: string;
  location?: {
    latitude?: number | string;
    longitude?: number | string;
    address_full?: string;
    address?: string;
  };
};

export type PVZ_CDEK = {
  code: string;
  email: string;
  is_dressing_room: boolean;
  location: {
    region: string;
    city_code: number;
    city: string;
    latitude: string;
    longitude: string;
    address_full: string;
    address: string;
  };
  name: string;
  nearest_metro_station: string;
  phone: [
    {
      number: string;
    },
  ];
  work_time: string;
};
