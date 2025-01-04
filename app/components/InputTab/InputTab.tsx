"use client";

import Dropzone from "../Dropzone/Dropzone";
import SelectFiles from "../SelectFiles/SelectFiles";
import { useAtom } from "jotai";
import { tabSelectedAtom } from "../../atom";

export default function InputTab() {
  const [tabSelected, setTabSelected] = useAtom(tabSelectedAtom);
  return (
    <div
      className={`flex flex-col w-full h-full ${
        tabSelected === "output" ? "hidden" : ""
      }`}
    >
      <div className="bg-white/80 w-full h-full p-2 overflow-y-auto border-2 border-gray-300 border-b-white/80">
        {/* <FileDialog /> */}
        <Dropzone />
        <SelectFiles />
      </div>
    </div>
  );
}
