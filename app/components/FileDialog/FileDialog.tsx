"use client";

import "@ant-design/v5-patch-for-react-19";
import { Button } from "antd";
import { useAtom } from "jotai";
import FolderOpenOutlined from "../icons/FolderOpen";
import { filePathsAtom } from "@/app/lib/atom";
import { openDialog } from "@/app/lib/utils";

export default function FileDialog() {
  const [filePaths, setFilePaths] = useAtom(filePathsAtom);
  return (
    <div>
      <Button
        type="primary"
        onClick={(e) => {
          e.stopPropagation();
          openDialog(setFilePaths, filePaths);
        }}
        title="Add files."
      >
        <FolderOpenOutlined size={16} className="fill-white" />
        Add Files
      </Button>
    </div>
  );
}
