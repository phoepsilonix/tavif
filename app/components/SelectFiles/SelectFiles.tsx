"use client";

import { useAtom } from "jotai";
import { filePathsAtom, fileInfosAtom } from "@/app/lib/atom";
import { FileInfo } from "@/app/index.d";
import { useEffect } from "react";
import File from "./File";
import { getFileInfo } from "./utils";
import { readFileAsync } from "../FileDialog/utils";

export default function SelectFiles() {
  const [filePaths] = useAtom(filePathsAtom);
  const [fileInfos, setFileInfos] = useAtom(fileInfosAtom);

  useEffect(() => {
    const fetchData = async () => {
      const binarys: Uint8Array[] = await readFileAsync(filePaths);
      const infos: FileInfo[] = getFileInfo(filePaths, binarys);
      setFileInfos(infos);
    };

    fetchData();
  }, [filePaths]);

  return (
    <div className="h-full w-full pb-2 overflow-hidden">
      <ul className="overflow-y-auto overflow-x-hidden h-[95%] w-full">
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
