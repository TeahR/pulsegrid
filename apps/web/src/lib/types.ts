export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  neighborhood: string;
  latitude: number;
  longitude: number;
};

export type Order = {
  id: string;
  restaurant_name: string;
  status: "queued" | "assigned" | "delivered";
  created_at: string;
};
