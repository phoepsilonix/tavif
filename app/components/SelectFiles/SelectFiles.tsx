"use client";

import { useAtom } from "jotai";
import { filePathsAtom, fileInfosAtom, thumbnailsBinaryAtom } from "@/app/atom";
import { FileInfo } from "@/app/index.d";
import { useEffect } from "react";
import File from "./File";
import { getFileInfo } from "./utils";
import { readFileAsync } from "../FileDialog/utils";
import { invoke } from "@tauri-apps/api/core";

export default function SelectFiles() {
  const [filePaths] = useAtom(filePathsAtom);
  const [fileInfos, setFileInfos] = useAtom(fileInfosAtom);
  const [thumbnailsBinarys, setThumbnailsBinary] = useAtom(thumbnailsBinaryAtom);

  useEffect(() => {
    const fetchData = async () => {
      const binarys: Uint8Array[] = await readFileAsync(filePaths);
      const infos: FileInfo[] = getFileInfo(filePaths, binarys);
      setFileInfos(infos);
      const thumbBinarys: Uint8Array[] = await invoke<Uint8Array[]>("generate_thumbnail", { imgBinarys: binarys });
      setThumbnailsBinary(thumbBinarys);
    };

    fetchData();
  }, [filePaths]);

  return (
    <div>
      <ul>
        {thumbnailsBinarys.length > 0 &&
          fileInfos.map((fileInfo, index) => (
            <File
              key={fileInfo.file_name_with_extension}
              fileInfo={fileInfo}
              binary={thumbnailsBinarys[index]}
              index={index}
            />
          ))}
      </ul>
    </div>
  );
}
