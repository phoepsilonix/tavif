"use client";

import { useAtom } from "jotai";
import {
  fileInfosAtom,
  processedFilePathsAtom,
  processedFileInfosAtom,
  processedFilePathsSortedAtom,
  checkboxSelectedAtom,
} from "@/app/lib/atom";
import File from "./File";
import { useEffect } from "react";
import { getProcessedFileInfo } from "../SelectFiles/utils";
import type { ProcessedFileInfo } from "@/app/index.d";

export default function ProcessedFiles() {
  const [fileInfos] = useAtom(fileInfosAtom);
  const [processedFilePaths] = useAtom(processedFilePathsAtom);
  const [processedFileInfos, setProcessedFileInfos] = useAtom(
    processedFileInfosAtom
  );
  const [processedFilePathsSorted, setProcessedFilePathsSorted] = useAtom(
    processedFilePathsSortedAtom
  );
  const [checkboxSelected, setCheckboxSelected] = useAtom(checkboxSelectedAtom);

  useEffect(() => {
    const fetchProcessedInfos = async () => {
      const processedInfos: ProcessedFileInfo[] = await getProcessedFileInfo(
        processedFilePaths,
        fileInfos
      );

      // processedFilePathsからfile_nameを抽出して新たな配列を作成
      const processedFilePathsWithFileName = processedFilePaths.map(
        (processedFilePath) => {
          const fileName = processedFilePath.split("\\").pop()?.split(".")[0];
          const filePath = processedFilePath;
          return { filePath, fileName };
        }
      );

      // processedFileInfosの順番に基づいてprocessedFilePathsを整列し、重複を排除
      const sortedProcessedFilePaths = processedInfos
        .map(
          (processedFileInfo) =>
            processedFilePathsWithFileName.find(
              (processedFilePath) =>
                processedFilePath.fileName === processedFileInfo.file_name
            )?.filePath
        )
        .filter((filePath): filePath is string => filePath !== undefined);

      setProcessedFileInfos(processedInfos);
      setProcessedFilePathsSorted(sortedProcessedFilePaths);
    };

    fetchProcessedInfos();
  }, [processedFilePaths]);

  useEffect(() => {
    // チェックボックスの選択状態を更新
    setCheckboxSelected([]);
    processedFilePathsSorted.forEach((_, index) => {
      setCheckboxSelected((prev) => [...prev, { index: index, checked: true }]);
    });
  }, [processedFilePathsSorted]);

  return (
    <div>
      {processedFileInfos.length > 0 &&
        processedFileInfos.map((processedFileInfo, index) => (
          <File
            index={index}
            key={processedFileInfo.file_name_with_extension}
            processedFileInfo={processedFileInfo}
          />
        ))}
    </div>
  );
}
