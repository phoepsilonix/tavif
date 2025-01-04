import { Button } from "antd";
import { open } from "@tauri-apps/plugin-dialog";
import { invoke } from "@tauri-apps/api/core";
import { useAtom } from "jotai";
import { processedFilePathsSortedAtom } from "@/app/atom";
import DownloadOutlined from "../icons/Download";

export default function OutputNavMenu() {
  const [processedFilePathsSorted] = useAtom(processedFilePathsSortedAtom);

  async function saveAll() {
    const outputDir = await open({
      title: "Select Output Directory",
      directory: true,
      multiple: false,
    });
    if (!outputDir) return;

    await invoke("save_files", {
      filePaths: processedFilePathsSorted,
      outputDir: outputDir,
    });
  }

  return (
    <div className="absolute top-0 left-0 w-full h-fit p-2 bg-gray-50/70 backdrop-blur-sm">
      <Button type="primary" onClick={saveAll}>
        <DownloadOutlined size={16} className="fill-white" />
        Save ALL
      </Button>
    </div>
  );
}
