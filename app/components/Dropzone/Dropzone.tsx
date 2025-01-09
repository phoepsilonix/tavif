"use client";
import { useEffect } from "react";
import { getCurrentWebview } from "@tauri-apps/api/webview";
import type { DragDropEvent } from "@tauri-apps/api/webview";
import type { Event } from "@tauri-apps/api/event";
import { useAtom } from "jotai";
import { filePathsAtom, tabSelectedAtom } from "../../lib/atom";
import { Modal } from "antd";
import "@ant-design/v5-patch-for-react-19";

export default function Dropzone() {
  const [, setFilePaths] = useAtom(filePathsAtom);
  const [, setTabSelected] = useAtom(tabSelectedAtom);
  const [modal, modalContextHolder] = Modal.useModal();

  useEffect(() => {
    // ドラッグ＆ドロップリスナーを設定する非同期関数
    const setupDragDropListener = async () => {
      // 現在のWebviewからドラッグ＆ドロップイベントをリッスン
      const unlisten = await getCurrentWebview().onDragDropEvent(
        async (event: Event<DragDropEvent>) => {
          // イベントのペイロードからタイプを取得
          const { type } = event.payload;
          // ドロップイベントの場合
          if (type === "drop") {
            // ドロップされたパスを取得
            const paths = event.payload.paths;
            // パスが配列であるか確認
            if (Array.isArray(paths)) {
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
                const extensions = Array.from(invalidExtensions).join(", ");
                modal.warning({
                  title: "Warning",
                  centered: true,
                  content: `Files with extension ${extensions} are not supported`,
                });
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
              } else {
                // 有効なファイルがない場合のメッセージ
                modal.error({
                  title: "Error",
                  centered: true,
                  content: "No valid image files dropped",
                });
              }
            } else {
              // パスが配列でない場合のエラーメッセージ
              console.error("Dropped paths is not an array:", paths);
            }
          }
        }
      );

      // コンポーネントがアンマウントされる際にリスナーを解除するための関数を返す
      return unlisten;
    };

    // ドラッグ＆ドロップリスナーを設定
    const unlisten = setupDragDropListener();

    // クリーンアップ関数を返す
    return () => {
      unlisten.then((fn) => fn()); // Promiseからunlisten関数を呼び出す
    };
  }, []);

  return <div>{modalContextHolder}</div>;
}
