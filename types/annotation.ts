export interface Polygon {
  id: string;
  points: number[];
  label?: string; // New field
}

export interface ImageAnnotation {
  image: string;
  polygons: Polygon[];
}
