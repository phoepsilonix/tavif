"use client";

import { useAtom } from "jotai";
import { tabSelectedAtom } from "../../lib/atom";
import ProcessedFiles from "../ProcessedFiles/ProcessedFiles";
import OutputNavMenu from "./OutputNavMenu";

export default function OutputTab() {
  const [tabSelected] = useAtom(tabSelectedAtom);
  return (
    <div
      className={`flex flex-col w-full h-full relative ${
        tabSelected === "input" ? "hidden" : ""
      }`}
    >
      <div className="bg-white/80 w-full h-full p-2 pt-10 overflow-y-auto border-2 border-gray-300 border-b-white/80">
        <OutputNavMenu />
        <ProcessedFiles />
      </div>
    </div>
  );
}
