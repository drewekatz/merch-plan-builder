"use client";

import { useEffect, useMemo, useState } from "react";
import { toPng } from "html-to-image";
import { Toolbar } from "@/components/Toolbar";
import { Sidebar } from "@/components/Sidebar";
import { SitePlanCanvas } from "@/components/SitePlanCanvas";
import { starterRetailers } from "@/data/retailers";
import { CategoryId, PlanningMode, RetailSpace, Retailer } from "@/types";

const STORAGE_KEY = "merch-plan-builder-v2";

type SavedProject = {
  imageSrc?: string;
  spaces: RetailSpace[];
  retailers: Retailer[];
  mode: PlanningMode;
};

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function Page() {
  const [mode, setMode] = useState<PlanningMode>("category");
  const [imageSrc, setImageSrc] = useState<string | undefined>();
  const [spaces, setSpaces] = useState<RetailSpace[]>([]);
  const [retailers, setRetailers] = useState<Retailer[]>(starterRetailers);
  const [selectedSpaceId, setSelectedSpaceId] = useState<string | undefined>();
  const [newRetailerName, setNewRetailerName] = useState("");
  const [newRetailerCategoryId, setNewRetailerCategoryId] = useState<CategoryId>("food-beverage");

  const selectedSpace = useMemo(
    () => spaces.find((space) => space.id === selectedSpaceId),
    [spaces, selectedSpaceId]
  );

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as SavedProject;
      setImageSrc(parsed.imageSrc);
      setSpaces(parsed.spaces ?? []);
      setRetailers(parsed.retailers?.length ? parsed.retailers : starterRetailers);
      setMode(parsed.mode ?? "category");
    } catch {
      console.warn("Could not load saved project.");
    }
  }, []);

  useEffect(() => {
    const project: SavedProject = { imageSrc, spaces, retailers, mode };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
  }, [imageSrc, spaces, retailers, mode]);

  function handleImageUpload(file: File) {
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result as string);
    reader.readAsDataURL(file);
  }

  function addSpace() {
    const nextNumber = spaces.length + 1;
    const newSpace: RetailSpace = {
      id: `Space ${nextNumber}`,
      x: 80 + spaces.length * 24,
      y: 80 + spaces.length * 24,
      width: 170,
      height: 95,
      categoryId: "tbd",
      retailerId: undefined,
      retailerName: "",
      notes: "",
    };

    setSpaces((current) => [...current, newSpace]);
    setSelectedSpaceId(newSpace.id);
  }

  function updateSpace(updatedSpace: RetailSpace) {
    setSpaces((current) =>
      current.map((space) => (space.id === selectedSpaceId || space.id === updatedSpace.id ? updatedSpace : space))
    );
    if (updatedSpace.id !== selectedSpaceId) setSelectedSpaceId(updatedSpace.id);
  }

  function deleteSpace(spaceId: string) {
    setSpaces((current) => current.filter((space) => space.id !== spaceId));
    setSelectedSpaceId(undefined);
  }

  function addRetailer() {
    const name = newRetailerName.trim();
    if (!name) return;

    const idBase = slugify(name) || "retailer";
    const id = retailers.some((retailer) => retailer.id === idBase)
      ? `${idBase}-${Date.now()}`
      : idBase;

    setRetailers((current) => [
      ...current,
      { id, name, categoryId: newRetailerCategoryId },
    ]);
    setNewRetailerName("");
  }

  async function exportPng() {
    const node = document.getElementById("export-area");
    if (!node) return;

    const dataUrl = await toPng(node, { cacheBust: true, pixelRatio: 2 });
    const link = document.createElement("a");
    link.download = "merch-plan.png";
    link.href = dataUrl;
    link.click();
  }

  return (
    <main className="flex h-screen flex-col">
      <Toolbar
        mode={mode}
        onModeChange={setMode}
        onAddSpace={addSpace}
        onExport={exportPng}
        onImageUpload={handleImageUpload}
      />

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <SitePlanCanvas
          mode={mode}
          imageSrc={imageSrc}
          spaces={spaces}
          retailers={retailers}
          selectedSpaceId={selectedSpaceId}
          onSelectSpace={setSelectedSpaceId}
          onUpdateSpace={updateSpace}
        />

        <Sidebar
          mode={mode}
          selectedSpace={selectedSpace}
          retailers={retailers}
          newRetailerName={newRetailerName}
          newRetailerCategoryId={newRetailerCategoryId}
          onNewRetailerNameChange={setNewRetailerName}
          onNewRetailerCategoryChange={(categoryId) => setNewRetailerCategoryId(categoryId as CategoryId)}
          onAddRetailer={addRetailer}
          onUpdateSpace={updateSpace}
          onDeleteSpace={deleteSpace}
        />
      </div>
    </main>
  );
}
