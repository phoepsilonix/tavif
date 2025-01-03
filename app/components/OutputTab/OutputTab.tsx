"use client";

import { useAtom } from "jotai";
import { tabSelectedAtom } from "../../atom";
import InputTabButton, { OutputTabButton } from "../TabButton/TabButton";

export default function OutputTab() {
  const [tabSelected, setTabSelected] = useAtom(tabSelectedAtom);
  return (
    <div
      className={`flex flex-col w-full h-full pt-[36px] absolute top-0 left-0 ${
        tabSelected === "input" ? "z-[-1]" : "z-[1]"
      }`}
    >
      <InputTabButton />
      <OutputTabButton />
      <div className="bg-white/80 w-full h-full border-2 border-gray-300 border-b-white/80">
      </div>
    </div>
  );
}
