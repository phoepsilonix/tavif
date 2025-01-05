"use client";

import { useAtom } from "jotai";
import { filePathsAtom, fileInfosAtom, isProcessingAtom } from "@/app/atom";
import { FileInfo } from "@/app/index.d";
import { useEffect } from "react";
import File from "./File";
import { getFileInfo } from "./utils";
import { readFileAsync } from "../FileDialog/utils";

export default function SelectFiles() {
  const [filePaths] = useAtom(filePathsAtom);
  const [fileInfos, setFileInfos] = useAtom(fileInfosAtom);
  const [_, setIsProcessing] = useAtom(isProcessingAtom);

  useEffect(() => {
    const fetchData = async () => {
      setIsProcessing(true);
      const binarys: Uint8Array[] = await readFileAsync(filePaths);
      const infos: FileInfo[] = getFileInfo(filePaths, binarys);
      setFileInfos(infos);
      setIsProcessing(false);
    };

    fetchData();
  }, [filePaths]);

  return (
    <div>
      <ul>
        {fileInfos.length > 0 &&
          fileInfos.map((fileInfo, index) => (
            <File
              key={fileInfo.file_name_with_extension}
              fileInfo={fileInfo}
              index={index}
            />
          ))}
      </ul>
    </div>
  );
}
