"use client";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { filePathsAtom, tabSelectedAtom } from "../../lib/atom";
import { WarningDialog, ErrorDialog } from "../Dialog/Dialog";
import { listen } from "@tauri-apps/api/event";

export default function Dropzone() {
  const [, setFilePaths] = useAtom(filePathsAtom);
  const [, setTabSelected] = useAtom(tabSelectedAtom);
  const [warningModalOpen, setWarningModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [extensions, setExtensions] = useState<string[]>([]);

  useEffect(() => {
    const unlistenDrop = listen("tauri://drag-drop", (event) => {
      const paths = (event.payload as { paths: string[] }).paths;
      if (paths && paths.length > 0) {
        if (Array.isArray(paths) && paths.length > 0) {
          // 有効な拡張子のリスト
          const validExtensions = ["jpeg", "jpg", "png", "webp"];
          // 有効なパスのみをフィルタリング
          const filteredPaths: string[] = [];
          const invalidExtensions = new Set<string>();

          paths.forEach((path) => {
            const extension = path.split(".").pop()?.toLowerCase() || "";
            if (validExtensions.includes(extension)) {
              filteredPaths.push(path);
            } else {
              invalidExtensions.add(extension);
            }
          });

          // 無効な拡張子があれば警告を表示
          if (invalidExtensions.size > 0) {
            setExtensions(Array.from(invalidExtensions));
            setWarningModalOpen(true);
            return;
          }

          // 有効なパスがある場合のみ処理を続行
          if (filteredPaths.length > 0) {
            // 既存のパスに新しいパスを追加し、重複を排除
            setFilePaths((prevPaths) => {
              const allPaths = [...prevPaths, ...filteredPaths]; // 既存のパスと新しいパスを結合
              const uniquePaths = Array.from(new Set(allPaths)); // 重複を排除
              return uniquePaths; // ユニークなパスを返す
            });
            setTabSelected("input");
            return;
          } else {
            // 有効なファイルがない場合のメッセージ
            setErrorModalOpen(true);
            return;
          }
        } else {
          // パスが配列でない場合のエラーメッセージ
          console.error("Dropped paths is not an array:", paths);
          return;
        }
      }
    });

    // クリーンアップ
    return () => {
      unlistenDrop.then((unlisten) => unlisten());
    };
  }, []);

  return (
    <div className="w-full h-full absolute top-0 left-0">
      {warningModalOpen && (
        <WarningDialog>
          <WarningDialogContent
            extensions={extensions}
            setWarningModalOpen={setWarningModalOpen}
          />
        </WarningDialog>
      )}
      {errorModalOpen && (
        <ErrorDialog>
          <ErrorDialogContent setErrorModalOpen={setErrorModalOpen} />
        </ErrorDialog>
      )}
    </div>
  );
}

function WarningDialogContent({
  extensions,
  setWarningModalOpen,
}: {
  extensions: string[];
  setWarningModalOpen: (open: boolean) => void;
}) {
  return (
    <div>
      <p className="text-sm text-gray-500 text-center px-4">
        Files with extension {extensions.join(", ")} are not supported
      </p>
      <div className="flex justify-end pt-2">
        <button
          className="bg-[#00b96b] text-white px-4 py-2 rounded-md hover:bg-[#00b96b]/80 transition-colors duration-200"
          onClick={() => setWarningModalOpen(false)}
        >
          OK
        </button>
      </div>
    </div>
  );
}

function ErrorDialogContent({
  setErrorModalOpen,
}: {
  setErrorModalOpen: (open: boolean) => void;
}) {
  return (
    <div>
      <p className="text-sm text-gray-500 text-center px-4">
        No valid files found.
      </p>
      <div className="flex justify-end pt-2">
        <button
          className="bg-[#00b96b] text-white px-4 py-2 rounded-md hover:bg-[#00b96b]/80 transition-colors duration-200"
          onClick={() => setErrorModalOpen(false)}
        >
          OK
        </button>
      </div>
    </div>
  );
}
