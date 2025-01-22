import "@ant-design/v5-patch-for-react-19";
import FileDialog from "../FileDialog/FileDialog";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useSetAtom } from "jotai";
import { filePathsAtom, fileInfosAtom } from "../../lib/atom";

export default function InputNubMenu() {
  const setFilePaths = useSetAtom(filePathsAtom);
  const setFileInfos = useSetAtom(fileInfosAtom);

  const removeAll = () => {
    setFilePaths([]);
    setFileInfos([]);
  };

  return (
    <div className="w-full h-fit pb-2 flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <FileDialog />
        <Button
          type="default"
          onClick={removeAll}
          title="Clear all selections."
        >
          <DeleteOutlined size={16} className="fill-white" />
          Remove All
        </Button>
      </div>
    </div>
  );
}
