"use client";

import SelectFiles from "../SelectFiles/SelectFiles";
import { useAtom } from "jotai";
import { tabSelectedAtom, filePathsAtom } from "../../lib/atom";
import InputNubMenu from "./InputNavMenu";
import Null from "./Null";
import Dropzone from "../Dropzone/Dropzone";

export default function InputTab() {
  const [tabSelected] = useAtom(tabSelectedAtom);
  const [filePaths] = useAtom(filePathsAtom);

  return (
    <div
      className={`flex flex-col w-full h-full ${
        tabSelected === "output" ? "hidden" : ""
      }`}
      data-tauri-drag-region
    >
      <div className="w-full h-full pb-2 bg-white/80">
        <div
          className={`w-full h-full p-2 overflow-hidden border-2 border-gray-300 border-b-white/80`}
        >
          <Dropzone />
          {filePaths.length > 0 && <InputNubMenu />}
          {filePaths.length > 0 ? <SelectFiles /> : <Null />}
        </div>
      </div>
    </div>
  );
}
