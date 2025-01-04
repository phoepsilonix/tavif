"use client";

import { useAtom } from "jotai";
import { tabSelectedAtom } from "../../atom";
import ProcessedFiles from "../ProcessedFiles/ProcessedFiles";

export default function OutputTab() {
  const [tabSelected, setTabSelected] = useAtom(tabSelectedAtom);
  return (
    <div
      className={`flex flex-col w-full h-full ${
        tabSelected === "input" ? "hidden" : ""
      }`}
    >
      <div className="bg-white/80 w-full h-full border-2 border-gray-300 border-b-white/80">
        <ProcessedFiles />
      </div>
    </div>
  );
}
