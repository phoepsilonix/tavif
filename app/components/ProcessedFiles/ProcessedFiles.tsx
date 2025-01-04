"use client";

import { useAtom } from "jotai";
import {
  filesBinaryAtom,
  fileInfosAtom,
  processedFilePathsAtom,
  processedFilesBinaryAtom,
  processedFileInfosAtom,
} from "@/app/atom";
import File from "./File";
import { useEffect } from "react";
import { getFileInfo } from "../SelectFiles/utils";
import { FileInfo } from "../SelectFiles";

export default function ProcessedFiles() {
  const [filesBinary] = useAtom(filesBinaryAtom);
  const [fileInfos] = useAtom(fileInfosAtom);
  const [processedFilePaths] = useAtom(processedFilePathsAtom);
  const [processedFilesBinary, setProcessedFilesBinary] = useAtom(
    processedFilesBinaryAtom
  );
  const [processedFileInfos, setProcessedFileInfos] = useAtom(
    processedFileInfosAtom
  );

  useEffect(() => {
    const processedInfos: FileInfo[] = getFileInfo(processedFilePaths);

    // fileInfosの順番に基づいてprocessedInfosを整列
    const sortedProcessedInfos = fileInfos
      .map((fileInfo) =>
        processedInfos.find(
          (processedInfo) =>
            processedInfo.file_name ===
            fileInfo.file_name
        )
      )
      .filter((info) => info !== undefined) as FileInfo[];

    setProcessedFileInfos(sortedProcessedInfos);
  }, [processedFilePaths]);

  return (
    <div>
      {processedFilesBinary.length > 0 &&
        processedFileInfos.map((fileInfo, index) => (
          <File
            key={fileInfo.file_name_with_extension}
            fileInfo={fileInfo}
            binary={filesBinary[index]}
            processedFileBinary={processedFilesBinary[index]}
          />
        ))}
    </div>
  );
}
