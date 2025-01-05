import Drop from "../icons/Drop";
import FileDialog from "../FileDialog/FileDialog";

export default function Null() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-gray-500 flex flex-col items-center justify-center">
        <Drop size={70} className="fill-[#00b96b]" />
        <p className="text-gray-500">Drag and drop to select an image</p>
        <div className="flex items-center gap-2 pt-8">
          <span className="text-gray-500">or</span>
          <FileDialog />
        </div>
        <p className="text-gray-400 text-xs pt-6">Supported jpg, jpeg, png, and webp.</p>
      </div>
    </div>
  );
}
