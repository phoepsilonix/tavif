"use client";
import { FileProps } from "./index.d";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useAtom, useSetAtom } from "jotai";
import { filePathsAtom, fileInfosAtom } from "../../lib/atom";
import { convertFileSrc } from "@tauri-apps/api/core";
import "@ant-design/v5-patch-for-react-19";

export default function File({ fileInfo, index }: FileProps) {
  const [filePaths, setFilePaths] = useAtom(filePathsAtom);
  const setFileInfos = useSetAtom(fileInfosAtom);

  const extension =
    fileInfo.file_name_with_extension.split(".").pop()?.toLowerCase() || "";

  const removeFile = (index: number) => {
    setFilePaths((prev) => prev.filter((_, i) => i !== index));
    setFileInfos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <li
      key={fileInfo.file_name_with_extension}
      className="flex items-center justify-between py-2 gap-3 text-sm border-b border-gray-300"
    >
      <div className="flex items-center gap-5">
        <span className="text-sm font-medium tracking-wider text-gray-700 px-1">
          {index + 1}
        </span>
        <div className="flex items-center aspect-square w-20 h-auto min-w-[90px]">
          {filePaths[index] && (
            <img
              src={convertFileSrc(filePaths[index])}
              alt={fileInfo.file_name_with_extension}
              loading="lazy"
            />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold text-gray-700 tracking-wider max-w-full break-all">
            {fileInfo.file_name_with_extension}
          </span>
          <div className="flex items-center gap-3">
            <span className="text-sm bg-green-200 text-gray-700 font-bold tracking-wider px-4 py-1 rounded-full">
              {extension.toUpperCase()}
            </span>
            <span className="text-sm font-medium tracking-wider text-gray-700">
              {fileInfo.file_binary_size}KB
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
