"use client";

import Dropzone from "../Dropzone/Dropzone";
import SelectFiles from "../SelectFiles/SelectFiles";
import { useAtom } from "jotai";
import { tabSelectedAtom, filePathsAtom } from "../../lib/atom";
import InputNubMenu from "./InputNavMenu";
import Null from "./Null";

export default function InputTab() {
  const [tabSelected] = useAtom(tabSelectedAtom);
  const [filePaths] = useAtom(filePathsAtom);

  return (
    <div
      className={`flex flex-col w-full h-full ${
        tabSelected === "output" ? "hidden" : ""
      }`}
    >
      <div className="w-full h-full relative">
        <div
          className={`bg-white/80 w-full h-full p-2 overflow-y-auto overflow-x-hidden border-2 border-gray-300 border-b-white/80 ${
            filePaths.length > 0 ? "pt-10" : ""
          }`}
        >
          <Dropzone />
          {filePaths.length > 0 && <InputNubMenu />}
          {filePaths.length > 0 ? <SelectFiles /> : <Null />}
        </div>
      </div>
    </div>
  );
}
