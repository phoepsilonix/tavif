import { ConfigProvider } from "antd";
import FileDialog from "./components/FileDialog/FileDialog";
import SelectFiles from "./components/SelectFiles/SelectFiles";
import ConvertButton from "./components/ConvertButton/ConvertButton";
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
      <FileDialog />
      <SelectFiles />
      <ConvertButton />
    </ConfigProvider>
  );
}
