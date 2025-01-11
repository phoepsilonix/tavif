"use client";

import { useAtom } from "jotai";
import { tabSelectedAtom } from "../../lib/atom";
import ProcessedFiles from "../ProcessedFiles/ProcessedFiles";
import OutputNavMenu from "./OutputNavMenu";

export default function OutputTab() {
  const [tabSelected] = useAtom(tabSelectedAtom);
  return (
    <div
      className={`flex flex-col w-full h-full relative pb-2 bg-white/80 ${
        tabSelected === "input" ? "hidden" : ""
      }`}
    >
      <div className="w-full h-full p-2 border-2 overflow-hidden border-gray-300 border-b-white/80">
        <OutputNavMenu />
        <div className="h-[95%] w-full overflow-y-auto">
          <ProcessedFiles />
        </div>
      </div>
    </div>
  );
}
