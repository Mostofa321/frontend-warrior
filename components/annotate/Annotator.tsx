"use client";

import { useEffect, useState } from "react";
import { Stage, Layer, Line } from "react-konva"; // Safe now, only runs in browser
import { v4 as uuidv4 } from "uuid";
import { images } from "@/lib/images";
import { useAnnotationStore } from "@/store/annotationStore";

export default function Annotator() {
  const { annotations, load, addPolygon, removePolygon } = useAnnotationStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [drawing, setDrawing] = useState(false);
  const [points, setPoints] = useState<number[]>([]);

  const currentImage = images[currentIndex];

  useEffect(() => {
    load();
  }, [load]);

  const currentPolygons =
    annotations.find((a) => a.image === currentImage)?.polygons || [];

  const handleCanvasClick = (e: any) => {
    if (!drawing) return;
    const stage = e.target.getStage();
    const pointer = stage.getPointerPosition();
    if (pointer) {
      setPoints((prev) => [...prev, pointer.x, pointer.y]);
    }
  };

  const finishPolygon = () => {
    if (points.length >= 6) {
      addPolygon(currentImage, { id: uuidv4(), points });
    }
    setPoints([]);
    setDrawing(false);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Annotating: {currentIndex + 1} / {images.length}
      </h2>

      {/* Navigation */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50"
          disabled={currentIndex === 0}
        >
          Prev
        </button>
        <button
          onClick={() =>
            setCurrentIndex((prev) => Math.min(images.length - 1, prev + 1))
          }
          className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50"
          disabled={currentIndex === images.length - 1}
        >
          Next
        </button>
      </div>

      {/* Annotator Canvas */}
      <Stage
        width={800}
        height={500}
        onClick={handleCanvasClick}
        className="border rounded bg-gray-100"
      >
        <Layer>
          {/* Existing polygons */}
          {currentPolygons.map((poly) => (
            <Line
              key={poly.id}
              points={poly.points}
              closed
              stroke="red"
              strokeWidth={2}
              onDblClick={() => removePolygon(currentImage, poly.id)}
            />
          ))}

          {/* Active drawing */}
          {points.length > 0 && (
            <Line points={points} stroke="blue" strokeWidth={2} />
          )}
        </Layer>
      </Stage>

      {/* Controls */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={() => setDrawing(true)}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Start Drawing
        </button>
        <button
          onClick={finishPolygon}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Finish Polygon
        </button>
        <p className="text-sm text-gray-600">
          Double-click a polygon to delete it.
        </p>
      </div>
    </div>
  );
}
