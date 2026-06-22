export type CategoryId =
  | "food-beverage"
  | "fitness"
  | "neighborhood-services"
  | "soft-goods"
  | "medical-wellness"
  | "entertainment"
  | "home-design"
  | "tbd";

export type PlanningMode = "category" | "retailer";

export type Category = {
  id: CategoryId;
  name: string;
  color: string;
};

export type Retailer = {
  id: string;
  name: string;
  categoryId: CategoryId;
  notes?: string;
};

export type RetailSpace = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  categoryId: CategoryId;
  retailerId?: string;
  retailerName: string;
  notes: string;
};
