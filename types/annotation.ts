export interface Polygon {
  id: string;
  points: number[]; // x1, y1, x2, y2...
}

export interface ImageAnnotation {
  image: string;
  polygons: Polygon[];
}
