"use client";
import { FileProps } from "./index.d";
import { getFileBase64, getFileSize } from "./utils";

export default function File({ fileInfo, binary, index }: FileProps) {
  const extension =
    fileInfo.file_name_with_extension.split(".").pop()?.toLowerCase() || "";
  return (
    <li
      key={fileInfo.file_name_with_extension}
      className="flex items-center gap-3 text-sm border-b border-gray-300"
    >
      <span className="text-sm font-medium tracking-wider text-gray-700">
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
    </li>
  );
}
