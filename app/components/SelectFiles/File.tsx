"use client";
import { FileProps } from "./index.d";
import { getFileBase64, getFileSize } from "./utils";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useAtom } from "jotai";
import { filePathsAtom, filesBinaryAtom, fileInfosAtom } from "../../atom";

export default function File({ fileInfo, binary, index }: FileProps) {
  const [filePaths, setFilePaths] = useAtom(filePathsAtom);
  const [filesBinary, setFilesBinary] = useAtom(filesBinaryAtom);
  const [fileInfos, setFileInfos] = useAtom(fileInfosAtom);

  const extension =
    fileInfo.file_name_with_extension.split(".").pop()?.toLowerCase() || "";

  const removeFile = (index: number) => {
    setFilePaths((prev) => prev.filter((_, i) => i !== index));
    setFilesBinary((prev) => prev.filter((_, i) => i !== index));
    setFileInfos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <li
      key={fileInfo.file_name_with_extension}
      className="flex items-center justify-between gap-3 text-sm border-b border-gray-300"
    >
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium tracking-wider text-gray-700 px-1">
          {index + 1}
        </span>
        <div className="flex items-center aspect-square w-20 h-auto">
          <img
            src={`data:${fileInfo.mime_type};base64,${getFileBase64(binary)}`}
            alt={fileInfo.file_name_with_extension}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-bold text-gray-700 tracking-wider">
            {fileInfo.file_name_with_extension}
          </span>
          <div className="flex items-center gap-3">
            <span className="text-sm bg-green-200 text-gray-700 font-bold tracking-wider px-4 py-1 rounded-full">
              {extension.toUpperCase()}
            </span>
            <span className="text-sm font-medium tracking-wider text-gray-700">
              {getFileSize(binary)}KB
            </span>
          </div>
        </div>
      </div>
      <Button
        type="default"
        title="Clear selection."
        danger
        onClick={() => {
          removeFile(index);
        }}
        className="h-fit w-fit py-2 mr-2"
      >
        <DeleteOutlined size={16} className="fill-white" />
      </Button>
    </li>
  );
}
