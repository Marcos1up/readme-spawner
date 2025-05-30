"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import EditorPanel from "@/components/editor/EditorPanel";
import PreviewPanel from "@/components/preview/PreviewPanel";
import useTheme from "@/hooks/useTheme";
import { RootState } from "@/store/store";

export default function Home() {
  //aplicar tema desde el store de redux
  const { theme } = useSelector((state: RootState) => state.theme);
  useTheme();

  return (
    <div className="app-layout">
      <div className="content-container">
        <EditorPanel />
        <PreviewPanel />
      </div>
    </div>
  );
}
