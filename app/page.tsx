import { ConfigProvider } from "antd";
import FileDialog from "./components/FileDialog/FileDialog";
import SelectFiles from "./components/SelectFiles/SelectFiles";
import SettingsMenu from "./components/SettingsMenu/SettingsMenu";
import LoadingModal from "./components/LoadingModal/LoadingModal";
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
      <LoadingModal />
      <div className="flex w-screen h-screen">
        <div className="min-w-[230px] h-screen">
          <SettingsMenu />
        </div>
        <div className="flex-1 min-h-screen">
          <FileDialog />
          <SelectFiles />
        </div>
      </div>
    </ConfigProvider>
  );
}
