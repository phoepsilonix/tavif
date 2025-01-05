import ExtensionType from "./ExtensionType";
import Quality from "./Quality";
import ConvertButton from "../ConvertButton/ConvertButton";

export default function SettingsMenu() {
  return (
    <div className="bg-[#00b96b] w-full h-[calc(100vh-30px)] px-2 py-4 flex flex-col gap-5">
      <ExtensionType />
      <Quality />
      <ConvertButton />
    </div>
  );
}
