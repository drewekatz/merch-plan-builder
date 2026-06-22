import { Download, Plus, Upload } from "lucide-react";
import { PlanningMode } from "@/types";

type ToolbarProps = {
  mode: PlanningMode;
  onModeChange: (mode: PlanningMode) => void;
  onAddSpace: () => void;
  onExport: () => void;
  onImageUpload: (file: File) => void;
};

export function Toolbar({ mode, onModeChange, onAddSpace, onExport, onImageUpload }: ToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-stone-200 bg-white px-4 py-3">
      <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm font-medium hover:bg-stone-50">
        <Upload size={16} />
        Upload Site Plan
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) onImageUpload(file);
          }}
        />
      </label>

      <button
        onClick={onAddSpace}
        className="inline-flex items-center gap-2 rounded-lg bg-stone-900 px-3 py-2 text-sm font-medium text-white hover:bg-stone-700"
      >
        <Plus size={16} />
        Add Space
      </button>

      <div className="flex overflow-hidden rounded-lg border border-stone-300">
        <button
          onClick={() => onModeChange("category")}
          className={`px-3 py-2 text-sm font-medium ${mode === "category" ? "bg-stone-900 text-white" : "bg-white hover:bg-stone-50"}`}
        >
          Use Type Mode
        </button>
        <button
          onClick={() => onModeChange("retailer")}
          className={`px-3 py-2 text-sm font-medium ${mode === "retailer" ? "bg-stone-900 text-white" : "bg-white hover:bg-stone-50"}`}
        >
          Retailer Mode
        </button>
      </div>

      <button
        onClick={onExport}
        className="inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm font-medium hover:bg-stone-50"
      >
        <Download size={16} />
        Export PNG
      </button>
    </div>
  );
}
