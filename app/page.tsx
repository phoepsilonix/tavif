import { ConfigProvider } from "antd";
import FileDialog from "./components/FileDialog/FileDialog";
import SelectFiles from "./components/SelectFiles/SelectFiles";
import ConvertButton from "./components/ConvertButton/ConvertButton";
import SettingsMenu from "./components/SettingsMenu/SettingsMenu";

export default function Home() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00b96b",
          colorBgContainer: "#f6ffed",
        },
      }}
    >
      <div className="flex w-full h-screen">
        <div className="min-w-[200px] h-screen">
          <SettingsMenu />
        </div>
        <div className="flex-1">
          <FileDialog />
          <SelectFiles />
          <ConvertButton />
        </div>
      </div>
    </ConfigProvider>
  );
}
