"use client";
import { FileProps } from "./index.d";

function getFileBase64(binary: Uint8Array): string {
  if (!binary || binary.length === 0) {
    return "";
  }
  const len = binary.length;
  let base64 = "";
  for (let i = 0; i < len; i++) {
    base64 += String.fromCharCode(binary[i]);
  }
  return btoa(base64);
}

function getFileSize(binary: Uint8Array): number {
  if (!binary) {
    return 0;
  }
  return parseFloat((binary.length / 1024).toFixed(1));
}

export default function File({ fileInfo, binary }: FileProps) {
  const extension =
    fileInfo.file_name_with_extension.split(".").pop()?.toLowerCase() || "";
  return (
    <li
      key={fileInfo.file_name_with_extension}
      className="flex items-center gap-3 text-sm"
    >
      <div className="flex items-center aspect-square w-20 h-auto">
        <img
          src={`data:${fileInfo.mime_type};base64,${getFileBase64(binary)}`}
          alt={fileInfo.file_name_with_extension}
        />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm font-bold text-gray-700">
          {fileInfo.file_name_with_extension}
        </span>
        <div className="flex items-center gap-3">
          <span className="text-sm bg-green-200 text-gray-700 font-bold tracking-wider px-4 py-1 rounded-full">
            {extension.toUpperCase()}
          </span>
          <span className="text-sm font-bold tracking-wider text-gray-700">
            {getFileSize(binary)}KB
          </span>
        </div>
      </div>
    </li>
  );
}
