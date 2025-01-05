export default function WindowMenu() {
  return (
    <div
      data-tauri-drag-region
      className="titlebar bg-[#00b96b] h-[30px] flex justify-between items-center pl-2 gap-5 border-b border-gray-300"
    >
      <div className="flex items-center gap-3">
        <img src="/128x128.png" alt="logo" className="w-5 h-5" loading="lazy"/>
      </div>
      <div className="flex">
        <div
          className="titlebar-button hover:bg-[#1adb8b] w-[40px] h-[30px] flex justify-center items-center cursor-pointer transition-colors duration-150"
          id="titlebar-minimize"
        >
          <img
            src="https://api.iconify.design/mdi:window-minimize.svg"
            alt="minimize"
          />
        </div>
        <div
          className="titlebar-button hover:bg-[#1adb8b] w-[40px] h-[30px] flex justify-center items-center cursor-pointer transition-colors duration-150"
          id="titlebar-maximize"
        >
          <img
            src="https://api.iconify.design/mdi:window-maximize.svg"
            alt="maximize"
          />
        </div>
        <div
          className="titlebar-button hover:bg-[#1adb8b] w-[40px] h-[30px] flex justify-center items-center cursor-pointer transition-colors duration-150"
          id="titlebar-close"
        >
          <img src="https://api.iconify.design/mdi:close.svg" alt="close" />
        </div>
      </div>
    </div>
  );
}
