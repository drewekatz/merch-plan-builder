import { Category } from "@/types";

export const categories: Category[] = [
  { id: "food-beverage", name: "Food + Beverage", color: "#ef4444" },
  { id: "fitness", name: "Fitness", color: "#3b82f6" },
  { id: "neighborhood-services", name: "Neighborhood Services", color: "#eab308" },
  { id: "soft-goods", name: "Soft Goods", color: "#22c55e" },
  { id: "medical-wellness", name: "Medical / Wellness", color: "#a855f7" },
  { id: "entertainment", name: "Entertainment", color: "#f97316" },
  { id: "home-design", name: "Home / Design", color: "#14b8a6" },
  { id: "tbd", name: "TBD", color: "#9ca3af" },
];

export function getCategory(categoryId: string) {
  return categories.find((category) => category.id === categoryId) ?? categories[categories.length - 1];
}

export function getNextCategoryId(currentId: string) {
  const currentIndex = categories.findIndex((category) => category.id === currentId);
  const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % categories.length;
  return categories[nextIndex].id;
}
