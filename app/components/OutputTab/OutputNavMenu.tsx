import { Button } from "antd";
import { useAtom } from "jotai";
import {
  processedFilePathsSortedAtom,
  checkboxSelectedAtom,
  processedFilePathsAtom,
  isSavingAtom,
  outputTempDirAtom,
} from "@/app/lib/atom";
import DownloadOutlined from "../icons/Download";
import CheckOutlined from "../icons/Check";
import { DeleteOutlined } from "@ant-design/icons";
import Null from "./Null";
import "@ant-design/v5-patch-for-react-19";
import { saveAll, saveSelected } from "@/app/lib/utils";
import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

export default function OutputNavMenu() {
  const [processedFilePathsSorted, setProcessedFilePathsSorted] = useAtom(
    processedFilePathsSortedAtom
  );
  const [checkboxSelected, setCheckboxSelected] = useAtom(checkboxSelectedAtom);
  const [, setProcessedFilePaths] = useAtom(processedFilePathsAtom);
  const [, setIsSaving] = useAtom(isSavingAtom);
  const [dialog, setDialog] = useState<React.ReactNode | null>(null);
  const [outputTempDir,] = useAtom(outputTempDirAtom);

  const handleSaveAll = async () => {
    const result = await saveAll(setIsSaving, processedFilePathsSorted, setDialog);
    if (result) {
      setDialog(result);
    }
  };

  const removeResult = async () => {
    setProcessedFilePathsSorted([]);
    setCheckboxSelected([]);
    setProcessedFilePaths([]);
    if (outputTempDir) {
      await invoke("remove_temp_dir", { outputTempDir: outputTempDir });
    }
  };


  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCheckboxSelected((prev) =>
      prev.map((item) => ({
        ...item,
        checked: e.target.checked,
      }))
    );
  }

  if (processedFilePathsSorted.length === 0) return <Null />;

  return (
    <div className="w-full h-fit flex items-center justify-between gap-2">
      {dialog}
      <div className="flex items-center gap-2">
        <Button
          type="primary"
          onClick={handleSaveAll}
          title="Save all files."
        >
          <DownloadOutlined size={16} className="fill-white" />
          Save ALL
        </Button>
        <Button
          type="primary"
          onClick={() =>
            saveSelected(
              setIsSaving,
              processedFilePathsSorted,
              checkboxSelected,
              setDialog
            )
          }
          disabled={checkboxSelected.every((item) => !item.checked)}
          title="Save selected files."
        >
          <DownloadOutlined size={16} className="fill-white" />
          Save Selected
        </Button>
        <Button
          type="default"
          onClick={removeResult}
          title="Delete all processed files from the temp directory."
        >
          <DeleteOutlined size={16} className="fill-white" />
          Remove Result
        </Button>
      </div>
      <label className="flex items-center gap-2 cursor-pointer mr-3 justify-center">
        All
        <div className="relative w-fit h-fit">
          <input
            type="checkbox"
            onChange={handleCheckboxChange}
            defaultChecked={true}
            className={`cursor-pointer appearance-none w-5 h-5 border-2 rounded-sm border-gray-300 ${
              checkboxSelected.every((item) => item.checked)
                ? "bg-[#00b96b]"
                : ""
            }`}
          />
          <CheckOutlined
            size="16"
            className={`absolute top-[2px] left-[2px] fill-white pointer-events-none ${
              checkboxSelected.every((item) => item.checked) ? "block" : "hidden"
            }`}
          />
        </div>
      </label>
    </div>
  );
}
