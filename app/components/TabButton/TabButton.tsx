import { FileAddTwoTone, FileImageTwoTone } from "@ant-design/icons";
import { useAtom } from "jotai";
import { tabSelectedAtom } from "../../atom";

export default function InputTabButton() {
  const [tabSelected, setTabSelected] = useAtom(tabSelectedAtom);
  return (
    <button
      className={`flex gap-3 justify-center items-center text-xl font-bold w-1/2 px-4 py-1 absolute top-0 left-0 transition-colors duration-200 z-10 ${
        tabSelected === "input" ? "pointer-events-none bg-white/80 border-2 border-gray-300 border-b-0 border-t-green-600 text-[#00b96b]" : "cursor-pointer bg-gray-200 border-2 border-gray-300 hover:text-[#00b96b]"
      }`}
      onClick={() => setTabSelected("input")}
    >
      <FileAddTwoTone twoToneColor={tabSelected === "input" ? "#00b96b" : "#7c7c7c"} />
      INPUT
    </button>
  );
}

export function OutputTabButton() {
  const [tabSelected, setTabSelected] = useAtom(tabSelectedAtom);
  return (
    <button
      className={`flex gap-3 justify-center items-center text-xl font-bold w-1/2 px-4 py-1 absolute top-0 right-0 transition-colors duration-200 z-10 ${
        tabSelected === "output" ? "pointer-events-none bg-white/80 border-2 border-gray-300 border-b-0 border-t-green-600 text-[#00b96b]" : "cursor-pointer bg-gray-200 border-2 border-gray-300 hover:text-[#00b96b]"
      }`}
      onClick={() => setTabSelected("output")}
    >
      <FileImageTwoTone twoToneColor={tabSelected === "output" ? "#00b96b" : "#7c7c7c"} />
      OUTPUT
    </button>
  );
}
