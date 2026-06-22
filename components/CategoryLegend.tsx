import { categories } from "@/data/categories";

export function CategoryLegend() {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-4">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-stone-500">Use Types</h2>
      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center gap-2 text-sm">
            <span className="h-4 w-4 rounded" style={{ backgroundColor: category.color }} />
            <span>{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
