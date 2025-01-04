"use client";

import { useAtom } from "jotai";
import { filePathsAtom, filesBinaryAtom, fileInfosAtom } from "@/app/atom";
import { FileInfo } from "./index.d";
import { useEffect } from "react";
import File from "./File";
import { getFileInfo } from "./utils";

export default function SelectFiles() {
  const [filePaths] = useAtom(filePathsAtom);
  const [filesBinary] = useAtom(filesBinaryAtom);
  const [fileInfos, setFileInfos] = useAtom(fileInfosAtom);

  useEffect(() => {
    const infos: FileInfo[] = getFileInfo(filePaths);
    setFileInfos(infos);
  }, [filePaths]);

  return (
    <div>
      <ul>
        {filesBinary.length > 0 &&
          fileInfos.map((fileInfo, index) => (
            <File key={fileInfo.file_name_with_extension} fileInfo={fileInfo} binary={filesBinary[index]} />
          ))}
      </ul>
    </div>
  );
}
