import { getCategory } from "@/data/categories";
import { Retailer } from "@/types";

type RetailerLibraryProps = {
  retailers: Retailer[];
  newRetailerName: string;
  newRetailerCategoryId: string;
  onNewRetailerNameChange: (name: string) => void;
  onNewRetailerCategoryChange: (categoryId: string) => void;
  onAddRetailer: () => void;
};

export function RetailerLibrary({
  retailers,
  newRetailerName,
  newRetailerCategoryId,
  onNewRetailerNameChange,
  onNewRetailerCategoryChange,
  onAddRetailer,
}: RetailerLibraryProps) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-4">
      <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-stone-500">Retailer / Concept Library</h2>
      <p className="mb-3 text-xs text-stone-500">Drag one onto a space to assign its name, category, and color.</p>

      <div className="mb-4 max-h-72 space-y-2 overflow-auto pr-1">
        {retailers.map((retailer) => {
          const category = getCategory(retailer.categoryId);
          return (
            <div
              key={retailer.id}
              draggable
              onDragStart={(event) => {
                event.dataTransfer.setData("application/x-retailer-id", retailer.id);
                event.dataTransfer.effectAllowed = "copy";
              }}
              className="cursor-grab rounded-lg border border-stone-200 bg-stone-50 p-2 text-sm active:cursor-grabbing"
            >
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded" style={{ backgroundColor: category.color }} />
                <span className="font-medium">{retailer.name}</span>
              </div>
              <div className="mt-1 text-xs text-stone-500">{category.name}</div>
            </div>
          );
        })}
      </div>

      <div className="space-y-2 border-t border-stone-200 pt-3">
        <input
          value={newRetailerName}
          onChange={(event) => onNewRetailerNameChange(event.target.value)}
          placeholder="Add retailer/concept"
          className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
        />
        <select
          value={newRetailerCategoryId}
          onChange={(event) => onNewRetailerCategoryChange(event.target.value)}
          className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
        >
          <option value="food-beverage">Food + Beverage</option>
          <option value="fitness">Fitness</option>
          <option value="neighborhood-services">Neighborhood Services</option>
          <option value="soft-goods">Soft Goods</option>
          <option value="medical-wellness">Medical / Wellness</option>
          <option value="entertainment">Entertainment</option>
          <option value="home-design">Home / Design</option>
          <option value="tbd">TBD</option>
        </select>
        <button
          onClick={onAddRetailer}
          className="w-full rounded-lg bg-stone-900 px-3 py-2 text-sm font-medium text-white hover:bg-stone-700"
        >
          Add to Library
        </button>
      </div>
    </div>
  );
}
