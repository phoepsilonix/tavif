"use client";

import { useAtom } from "jotai";
import { filePathsAtom, filesBinaryAtom, fileInfosAtom } from "@/app/atom";
import { FileInfo } from "./index.d";
import { useEffect } from "react";
import File from "./File";
import { getFileInfo } from "./utils";
import { readFileAsync } from "../FileDialog/utils";

export default function SelectFiles() {
  const [filePaths] = useAtom(filePathsAtom);
  const [filesBinary, setFilesBinary] = useAtom(filesBinaryAtom);
  const [fileInfos, setFileInfos] = useAtom(fileInfosAtom);

  useEffect(() => {
    const fetchData = async () => {
      const infos: FileInfo[] = getFileInfo(filePaths);
      setFileInfos(infos);
      const binarys = await readFileAsync(filePaths);
      setFilesBinary(binarys);
    };

    fetchData();
  }, [filePaths]);

  return (
    <div>
      <ul>
        {filesBinary.length > 0 &&
          fileInfos.map((fileInfo, index) => (
            <File
              key={fileInfo.file_name_with_extension}
              fileInfo={fileInfo}
              binary={filesBinary[index]}
              index={index}
            />
          ))}
      </ul>
    </div>
  );
}
