"use client";
import { ProcessedFilesProps } from ".";
import RightArrow from "../icons/RightArrow";
import { getFileBase64, getFileSize } from "../SelectFiles/utils";

function getFileSizeBulk(binary: Uint8Array, processedFileBinary: Uint8Array) {
  const binarySize: number = getFileSize(binary);
  const processedFileBinarySize: number = getFileSize(processedFileBinary);
  const compressionRate: number = parseFloat(
    (((binarySize - processedFileBinarySize) / binarySize) * -100).toFixed(1)
  );
  return {
    binarySize,
    processedFileBinarySize,
    compressionRate,
  };
}

export default function File({
  index,
  fileInfo,
  binary,
  processedFileBinary,
}: ProcessedFilesProps) {
  const extension =
    fileInfo.file_name_with_extension.split(".").pop()?.toLowerCase() || "";
  const { binarySize, processedFileBinarySize, compressionRate } =
    getFileSizeBulk(binary, processedFileBinary);

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
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium tracking-wider text-gray-700">
              {binarySize}KB
            </span>
            <RightArrow size={16} className="fill-gray-700" />
            <span className="text-base font-bold tracking-wider text-gray-700">
              {processedFileBinarySize}KB
            </span>
            <span
              className={`text-sm font-bold tracking-wider text-white px-4 py-1 rounded-full ${
                compressionRate > 0 ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {compressionRate > 0 ? `+${compressionRate}` : compressionRate}%
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}
