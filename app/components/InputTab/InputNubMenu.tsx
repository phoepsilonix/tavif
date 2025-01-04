import "@ant-design/v5-patch-for-react-19";
import FileDialog from "../FileDialog/FileDialog";

export default function InputNubMenu() {
  return (
    <div className="absolute top-1 left-0 w-full h-fit p-2 flex items-center justify-between gap-2 bg-gray-50/50 backdrop-blur-sm border-l-2 border-r-2 border-gray-300 z-10">
      <div className="flex items-center gap-2">
        <FileDialog />
      </div>
    </div>
  );
}
