"use client";

import { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { images } from "@/lib/images";
import { useAnnotationStore } from "@/store/annotationStore";
import useImage from "use-image";

// Dynamic require for react-konva to avoid server import
let Stage: any = null;
let Layer: any = null;
let Line: any = null;
let KonvaImage: any = null;
let Text: any = null;

if (typeof window !== "undefined") {
  const ReactKonva = require("react-konva");
  Stage = ReactKonva.Stage;
  Layer = ReactKonva.Layer;
  Line = ReactKonva.Line;
  KonvaImage = ReactKonva.Image;
  Text = ReactKonva.Text;
}

const ORIGINAL_WIDTH = 800;
const ORIGINAL_HEIGHT = 500;

export default function AnnotatorPure() {
  const { annotations, load, addPolygon, removePolygon } = useAnnotationStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [drawing, setDrawing] = useState(false);
  const [points, setPoints] = useState<number[]>([]);
  const [scale, setScale] = useState(1);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const currentImage = images[currentIndex];
  const [bgImage] = useImage(currentImage);

  useEffect(() => {
    load();
  }, [load]);

  // Responsive scaling
  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
      const newScale = containerWidth / ORIGINAL_WIDTH;
      setScale(newScale > 1 ? 1 : newScale);
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  if (!Stage || !Layer || !Line || !KonvaImage || !Text) return null;

  const currentPolygons =
    annotations.find((a) => a.image === currentImage)?.polygons || [];

  const handleCanvasClick = (e: any) => {
    if (!drawing) return;
    const stage = e.target.getStage();
    const pointer = stage.getPointerPosition();
    if (pointer) {
      setPoints((prev) => [...prev, pointer.x / scale, pointer.y / scale]);
    }
  };

  const finishPolygon = () => {
    if (points.length >= 6) {
      // Ask for a label
      const label = prompt("Enter label for this polygon:", "Object") || "Object";

      addPolygon(currentImage, { id: uuidv4(), points, label });
    }
    setPoints([]);
    setDrawing(false);
  };

  const handleDelete = () => {
    if (selectedId) {
      removePolygon(currentImage, selectedId);
      setSelectedId(null);
    }
  };

  // Helper to scale points
  const scaledPoints = (pts: number[]) => pts.map((p) => p * scale);

  // Calculate polygon center for label placement
  const polygonCenter = (pts: number[]) => {
    let x = 0, y = 0;
    for (let i = 0; i < pts.length; i += 2) {
      x += pts[i];
      y += pts[i + 1];
    }
    const len = pts.length / 2;
    return [x / len, y / len];
  };

  return (
    <div ref={containerRef} className="w-full">
      <h1 className="text-3xl font-bold mb-6">Image Annotation Tool</h1>

      {/* Navigation */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50"
          disabled={currentIndex === 0}
        >
          Prev
        </button>
        <span>
          {currentIndex + 1} / {images.length}
        </span>
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
        width={ORIGINAL_WIDTH * scale}
        height={ORIGINAL_HEIGHT * scale}
        onClick={handleCanvasClick}
        className="border rounded bg-gray-100"
      >
        <Layer>
          {/* Background Image */}
          {bgImage && (
            <KonvaImage
              image={bgImage}
              width={ORIGINAL_WIDTH * scale}
              height={ORIGINAL_HEIGHT * scale}
            />
          )}

          {/* Existing polygons */}
          {currentPolygons.map((poly) => {
            const scaledPts = scaledPoints(poly.points);
            const [cx, cy] = polygonCenter(scaledPts);

            return (
              <>
                <Line
                  key={poly.id}
                  points={scaledPts}
                  closed
                  stroke={
                    poly.id === selectedId
                      ? "orange"
                      : hoveredId === poly.id
                      ? "yellow"
                      : "red"
                  }
                  strokeWidth={poly.id === selectedId ? 3 : 2}
                  onMouseEnter={() => setHoveredId(poly.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setSelectedId(poly.id)}
                />
                {poly.label && (
                  <Text
                    x={cx}
                    y={cy}
                    text={poly.label}
                    fontSize={16}
                    fill="white"
                    stroke="black"
                    strokeWidth={0.5}
                    align="center"
                    offsetX={poly.label.length * 4}
                    offsetY={8}
                  />
                )}
              </>
            );
          })}

          {/* Active drawing */}
          {points.length > 0 && (
            <Line points={scaledPoints(points)} stroke="blue" strokeWidth={2} />
          )}
        </Layer>
      </Stage>

      {/* Controls */}
      <div className="flex gap-4 mt-4 flex-wrap">
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

        {selectedId && (
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Delete Selected
          </button>
        )}

        <p className="text-sm text-gray-600">
          Hover to highlight, click to select, labels appear on polygons.
        </p>
      </div>
    </div>
  );
}
