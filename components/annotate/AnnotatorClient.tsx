"use client";

import dynamic from "next/dynamic";

// Load the actual Annotator dynamically, no SSR
const Annotator = dynamic(() => import("./AnnotatorPure"), {
  ssr: false,
  loading: () => <p>Loading annotation tool...</p>,
});

export default function AnnotatorClient() {
  return <Annotator />;
}
