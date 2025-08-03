import { create } from "zustand";
import { ImageAnnotation, Polygon } from "@/types/annotation";

interface AnnotationState {
  annotations: ImageAnnotation[];
  load: () => void;
  save: () => void;
  addPolygon: (image: string, polygon: Polygon) => void;
  removePolygon: (image: string, polygonId: string) => void;
}

export const useAnnotationStore = create<AnnotationState>((set, get) => ({
  annotations: [],
  load: () => {
    const saved = localStorage.getItem("annotations");
    if (saved) set({ annotations: JSON.parse(saved) });
  },
  save: () => {
    localStorage.setItem("annotations", JSON.stringify(get().annotations));
  },
  addPolygon: (image, polygon) => {
    const { annotations } = get();
    const updated = [...annotations];
    const idx = updated.findIndex((a) => a.image === image);
    if (idx >= 0) {
      updated[idx].polygons.push(polygon);
    } else {
      updated.push({ image, polygons: [polygon] });
    }
    set({ annotations: updated });
    get().save();
  },
  removePolygon: (image, polygonId) => {
    const { annotations } = get();
    const updated = annotations.map((a) =>
      a.image === image
        ? { ...a, polygons: a.polygons.filter((p) => p.id !== polygonId) }
        : a
    );
    set({ annotations: updated });
    get().save();
  },
}));
