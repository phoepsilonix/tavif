import ExtensionType from "./ExtensionType";
import Quality from "./Quality";
import ConvertButton from "../ConvertButton/ConvertButton";

export default function SettingsMenu() {
  return (
    <div className="bg-[#00b96b] w-full h-screen px-2 py-4 flex flex-col gap-5">
      <ExtensionType />
      <Quality />
      <ConvertButton />
    </div>
  );
}
