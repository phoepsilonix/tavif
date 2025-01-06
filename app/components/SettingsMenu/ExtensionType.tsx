"use client";

import { Select } from "antd";
import { useAtom } from "jotai";
import { extensionTypeAtom } from "@/app/lib/atom";

export default function ExtensionType() {
  const [extensionType, setExtensionType] = useAtom(extensionTypeAtom);
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-bold text-white tracking-wider">
        Extension Type
      </span>
      <Select
        defaultValue={extensionType}
        style={{ width: "100%" }}
        onChange={(value) => setExtensionType(value as "webp" | "avif")}
        options={[
          { value: "webp", label: "WebP" },
          { value: "avif", label: "AVIF" },
        ]}
      />
    </div>
  );
}
