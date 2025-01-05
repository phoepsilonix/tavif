"use client";
import { ProcessedFilesProps } from ".";
import RightArrow from "../icons/RightArrow";
import { getFileBase64 } from "../SelectFiles/utils";
import { Checkbox } from "antd";
import { useAtom } from "jotai";
import { checkboxSelectedAtom, thumbnailsBinaryAtom } from "@/app/atom";
import { ProcessedFileInfo } from "@/app/index.d";
import { useEffect, useState } from "react";

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
  const [thumbnailsBinarys] = useAtom(thumbnailsBinaryAtom);
  const [initialBinarys, setInitialBinarys] = useState<Uint8Array>();

  useEffect(() => {
    if (thumbnailsBinarys.length > 0) {
      setInitialBinarys(thumbnailsBinarys[index]);
    }
  }, []);

  const compressionRate = getCompressionRate(processedFileInfo);

  return (
    <li
      key={processedFileInfo.file_name_with_extension}
      className="flex items-center justify-between pr-3 gap-3 text-sm border-b border-gray-300"
    >
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium tracking-wider text-gray-700 px-1">
          {index + 1}
        </span>
        <div className="flex items-center aspect-square w-20 h-auto">
          <img
            src={`data:image/jpeg;base64,${getFileBase64(
              initialBinarys || thumbnailsBinarys[index]
            )}`}
            alt={processedFileInfo.file_name_with_extension}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-bold text-gray-700 tracking-wider">
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
      <Checkbox
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
        className="z-1"
      />
    </li>
  );
}
