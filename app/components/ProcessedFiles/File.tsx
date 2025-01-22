"use client";
import { ProcessedFilesProps } from ".";
import RightArrow from "../icons/RightArrow";
import { useAtom, useAtomValue } from "jotai";
import { checkboxSelectedAtom, filePathsAtom } from "@/app/lib/atom";
import { ProcessedFileInfo } from "@/app/index.d";
import "@ant-design/v5-patch-for-react-19";
import CheckOutlined from "../icons/Check";
import { convertFileSrc } from "@tauri-apps/api/core";

function getCompressionRate(processedFileInfo: ProcessedFileInfo) {
  const compressionRate: number = parseFloat(
    (
      ((processedFileInfo.file_binary_size -
        processedFileInfo.processed_file_binary_size) /
        processedFileInfo.file_binary_size) *
      -100
    ).toFixed(1)
  );
  return compressionRate;
}

export default function File({
  index,
  processedFileInfo,
}: ProcessedFilesProps) {
  const [checkboxSelected, setCheckboxSelected] = useAtom(checkboxSelectedAtom);
  const filePaths = useAtomValue(filePathsAtom);

  const compressionRate = getCompressionRate(processedFileInfo);

  return (
    <li
      key={processedFileInfo.file_name_with_extension}
      className="flex items-center justify-between pr-3 gap-3 text-sm border-b border-gray-300 py-3"
    >
      <div className="flex items-center gap-5">
        <span className="text-sm font-medium tracking-wider text-gray-700 px-1">
          {index + 1}
        </span>
        <div className="flex items-center aspect-square w-20 h-auto min-w-[90px]">
          {filePaths[index] && (
            <img
              src={convertFileSrc(filePaths[index])}
              alt={processedFileInfo.file_name_with_extension}
              loading="lazy"
            />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-bold text-gray-700 tracking-wider max-w-full break-all">
            {processedFileInfo.file_name_with_extension}
          </span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium tracking-wider text-gray-700">
                {processedFileInfo.file_binary_size}KB
              </span>
              <RightArrow size={16} className="fill-gray-700" />
              <span className="text-base font-bold tracking-wider text-gray-700">
                {processedFileInfo.processed_file_binary_size}KB
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
      </div>
      <div className="relative w-fit h-fit">
        <input
          title="Select this file"
          type="checkbox"
        checked={checkboxSelected[index]?.checked || false}
        onChange={(e) => {
          setCheckboxSelected((prev) =>
            prev.map((item) =>
              item.index === index
                ? { ...item, checked: e.target.checked }
                : item
            )
          );
        }}
          className={`cursor-pointer appearance-none w-5 h-5 border-2 rounded-sm border-gray-300 ${
            checkboxSelected[index]?.checked ? "bg-[#00b96b]" : ""
          }`}
        />
        <CheckOutlined
          size="16"
          className={`absolute top-[2px] left-[2px] fill-white pointer-events-none ${
            checkboxSelected[index]?.checked ? "block" : "hidden"
          }`}
        />
      </div>
    </li>
  );
}
