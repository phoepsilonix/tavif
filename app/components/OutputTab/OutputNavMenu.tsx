import { Button } from "antd";
import { open } from "@tauri-apps/plugin-dialog";
import { invoke } from "@tauri-apps/api/core";
import { useAtom } from "jotai";
import { processedFilePathsSortedAtom, checkboxSelectedAtom , processedFilePathsAtom} from "@/app/atom";
import DownloadOutlined from "../icons/Download";
import { DeleteOutlined } from "@ant-design/icons";
import { Checkbox, CheckboxChangeEvent } from "antd";
import Null from "./Null";
import "@ant-design/v5-patch-for-react-19";

export default function OutputNavMenu() {
  const [processedFilePathsSorted, setProcessedFilePathsSorted] = useAtom(processedFilePathsSortedAtom);
  const [checkboxSelected, setCheckboxSelected] = useAtom(checkboxSelectedAtom);
  const [processedFilePaths, setProcessedFilePaths] = useAtom(processedFilePathsAtom);

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

  async function saveSelected() {
    const outputDir = await open({
      title: "Select Output Directory",
      directory: true,
      multiple: false,
    });
    if (!outputDir) return;

    const selectedFilePaths = checkboxSelected
      .filter((item) => item.checked)
      .map((item) => processedFilePathsSorted[item.index]);

    await invoke("save_files", {
      filePaths: selectedFilePaths,
      outputDir: outputDir,
    });
  }

  async function removeResult() {
    await invoke("remove_result", {
      filePaths: processedFilePathsSorted,
    });
    setProcessedFilePathsSorted([]);
    setCheckboxSelected([]);
    setProcessedFilePaths([]);
  }

  function handleCheckboxChange(e: CheckboxChangeEvent) {
    setCheckboxSelected((prev) =>
      prev.map((item) => ({
        ...item,
        checked: e.target.checked,
      }))
    );
  }

  if (processedFilePathsSorted.length === 0) return <Null />;

  return (
    <div className="absolute top-0 left-0 w-full h-fit p-2 flex items-center justify-between gap-2 bg-gray-50/50 backdrop-blur-sm border-l-2 border-r-2 border-gray-300 z-10">
      <div className="flex items-center gap-2">
        <Button type="primary" onClick={saveAll}>
          <DownloadOutlined size={16} className="fill-white" />
          Save ALL
        </Button>
        <Button type="primary" onClick={saveSelected}>
          <DownloadOutlined size={16} className="fill-white" />
          Save Selected
        </Button>
        <Button type="default" onClick={removeResult}>
          <DeleteOutlined size={16} className="fill-white" />
          Remove Result
        </Button>
      </div>
      <label className="flex items-center gap-2 cursor-pointer mr-3">
        All
        <Checkbox onChange={handleCheckboxChange} defaultChecked={true} />
      </label>
    </div>
  );
}
