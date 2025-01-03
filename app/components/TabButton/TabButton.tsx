import { FileAddTwoTone, FileImageTwoTone } from "@ant-design/icons";
import { useAtom } from "jotai";
import { tabSelectedAtom } from "../../atom";

export default function InputTabButton() {
  const [tabSelected, setTabSelected] = useAtom(tabSelectedAtom);
  return (
    <button
      className={`flex gap-3 justify-center items-center text-xl font-bold text-gray-700 w-1/2 px-4 py-1 absolute top-0 left-0 ${
        tabSelected === "input" ? "pointer-events-none bg-white/80 border-2 border-gray-300 border-b-0" : "cursor-pointer bg-gray-200 border-2 border-gray-300"
      }`}
      onClick={() => setTabSelected("input")}
    >
      <FileAddTwoTone twoToneColor="#00b96b" />
      Input
    </button>
  );
}

export function OutputTabButton() {
  const [tabSelected, setTabSelected] = useAtom(tabSelectedAtom);
  return (
    <button
      className={`flex gap-3 justify-center items-center text-xl font-bold text-gray-700 w-1/2 px-4 py-1 absolute top-0 right-0 ${
        tabSelected === "output" ? "pointer-events-none bg-white/80 border-2 border-gray-300 border-b-0" : "cursor-pointer bg-gray-200 border-2 border-gray-300"
      }`}
      onClick={() => setTabSelected("output")}
    >
      <FileImageTwoTone twoToneColor="#00b96b" />
      Output
    </button>
  );
}
