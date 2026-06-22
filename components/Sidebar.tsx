import { categories } from "@/data/categories";
import { CategoryId, PlanningMode, RetailSpace, Retailer } from "@/types";
import { CategoryLegend } from "./CategoryLegend";
import { RetailerLibrary } from "./RetailerLibrary";

type SidebarProps = {
  mode: PlanningMode;
  selectedSpace?: RetailSpace;
  retailers: Retailer[];
  newRetailerName: string;
  newRetailerCategoryId: string;
  onNewRetailerNameChange: (name: string) => void;
  onNewRetailerCategoryChange: (categoryId: string) => void;
  onAddRetailer: () => void;
  onUpdateSpace: (space: RetailSpace) => void;
  onDeleteSpace: (spaceId: string) => void;
};

export function Sidebar({
  mode,
  selectedSpace,
  retailers,
  newRetailerName,
  newRetailerCategoryId,
  onNewRetailerNameChange,
  onNewRetailerCategoryChange,
  onAddRetailer,
  onUpdateSpace,
  onDeleteSpace,
}: SidebarProps) {
  return (
    <aside className="w-full border-l border-stone-200 bg-stone-50 p-4 lg:w-96">
      <div className="space-y-4">
        <div className="rounded-xl border border-stone-200 bg-white p-4">
          <h1 className="text-xl font-semibold">Merch Plan Builder</h1>
          <p className="mt-1 text-sm text-stone-600">
            {mode === "category"
              ? "Use Type Mode: click spaces to cycle through retail categories."
              : "Retailer Mode: drag retailers or concepts onto spaces."}
          </p>
        </div>

        {selectedSpace ? (
          <div className="rounded-xl border border-stone-200 bg-white p-4">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-stone-500">Selected Space</h2>
            <div className="space-y-3">
              <label className="block">
                <span className="text-sm font-medium">Space ID</span>
                <input
                  value={selectedSpace.id}
                  onChange={(event) => onUpdateSpace({ ...selectedSpace, id: event.target.value })}
                  className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium">Use Type / Category</span>
                <select
                  value={selectedSpace.categoryId}
                  onChange={(event) =>
                    onUpdateSpace({
                      ...selectedSpace,
                      categoryId: event.target.value as CategoryId,
                      retailerId: undefined,
                    })
                  }
                  className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-medium">Retailer / Concept</span>
                <input
                  value={selectedSpace.retailerName}
                  onChange={(event) => onUpdateSpace({ ...selectedSpace, retailerName: event.target.value, retailerId: undefined })}
                  placeholder="Tatte, Sweetgreen, fitness, etc."
                  className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium">Notes</span>
                <textarea
                  value={selectedSpace.notes}
                  onChange={(event) => onUpdateSpace({ ...selectedSpace, notes: event.target.value })}
                  rows={4}
                  className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
                />
              </label>

              <button
                onClick={() => onDeleteSpace(selectedSpace.id)}
                className="w-full rounded-lg border border-red-300 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
              >
                Delete Space
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-stone-200 bg-white p-4 text-sm text-stone-600">
            Select a space to edit it.
          </div>
        )}

        {mode === "retailer" ? (
          <RetailerLibrary
            retailers={retailers}
            newRetailerName={newRetailerName}
            newRetailerCategoryId={newRetailerCategoryId}
            onNewRetailerNameChange={onNewRetailerNameChange}
            onNewRetailerCategoryChange={onNewRetailerCategoryChange}
            onAddRetailer={onAddRetailer}
          />
        ) : (
          <CategoryLegend />
        )}
      </div>
    </aside>
  );
}
