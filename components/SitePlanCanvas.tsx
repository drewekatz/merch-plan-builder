import { getCategory, getNextCategoryId } from "@/data/categories";
import { PlanningMode, RetailSpace, Retailer } from "@/types";

type SitePlanCanvasProps = {
  mode: PlanningMode;
  imageSrc?: string;
  spaces: RetailSpace[];
  retailers: Retailer[];
  selectedSpaceId?: string;
  onSelectSpace: (spaceId: string) => void;
  onUpdateSpace: (space: RetailSpace) => void;
};

export function SitePlanCanvas({
  mode,
  imageSrc,
  spaces,
  retailers,
  selectedSpaceId,
  onSelectSpace,
  onUpdateSpace,
}: SitePlanCanvasProps) {
  function assignRetailer(space: RetailSpace, retailerId: string) {
    const retailer = retailers.find((item) => item.id === retailerId);
    if (!retailer) return;

    onUpdateSpace({
      ...space,
      retailerId: retailer.id,
      retailerName: retailer.name,
      categoryId: retailer.categoryId,
    });
  }

  return (
    <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto bg-stone-200 p-6">
      <div id="export-area" className="relative min-h-[600px] w-full max-w-5xl overflow-hidden rounded-xl bg-white shadow">
        {imageSrc ? (
          <img src={imageSrc} alt="Uploaded site plan" className="block h-auto w-full select-none" draggable={false} />
        ) : (
          <div className="flex h-[600px] items-center justify-center text-center text-stone-500">
            <div>
              <p className="text-lg font-medium">Upload a site plan to begin.</p>
              <p className="mt-1 text-sm">PNG or JPG works best for this prototype.</p>
            </div>
          </div>
        )}

        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 600" preserveAspectRatio="none">
          {spaces.map((space) => {
            const category = getCategory(space.categoryId);
            const isSelected = selectedSpaceId === space.id;
            const label = space.retailerName || space.id || category.name;

            return (
              <g key={`${space.id}-${space.x}-${space.y}`}>
                <rect
                  x={space.x}
                  y={space.y}
                  width={space.width}
                  height={space.height}
                  fill={category.color}
                  fillOpacity={0.72}
                  stroke={isSelected ? "#111827" : "#ffffff"}
                  strokeWidth={isSelected ? 4 : 2}
                  rx={6}
                  className="cursor-pointer"
                  onClick={(event) => {
                    event.stopPropagation();
                    onSelectSpace(space.id);
                    if (mode === "category") {
                      onUpdateSpace({
                        ...space,
                        categoryId: getNextCategoryId(space.categoryId),
                        retailerId: undefined,
                        retailerName: "",
                      });
                    }
                  }}
                  onDragOver={(event) => {
                    if (mode === "retailer") event.preventDefault();
                  }}
                  onDrop={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    onSelectSpace(space.id);
                    const retailerId = event.dataTransfer.getData("application/x-retailer-id");
                    if (retailerId) assignRetailer(space, retailerId);
                  }}
                />
                <text
                  x={space.x + space.width / 2}
                  y={space.y + space.height / 2 - 8}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="pointer-events-none select-none fill-white text-[18px] font-bold"
                >
                  {label}
                </text>
                <text
                  x={space.x + space.width / 2}
                  y={space.y + space.height / 2 + 16}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="pointer-events-none select-none fill-white text-[13px] font-semibold"
                >
                  {category.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
