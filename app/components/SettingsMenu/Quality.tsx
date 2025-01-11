"use client";

import React from "react";
import type { InputNumberProps } from "antd";
import { InputNumber, Slider } from "antd";
import { useAtom } from "jotai";
import { qualityAtom } from "@/app/lib/atom";
import "@ant-design/v5-patch-for-react-19";
import { useEffect } from "react";

const IntegerStep: React.FC = () => {
  const [inputValue, setInputValue] = useAtom(qualityAtom);

  const onChange: InputNumberProps["onChange"] = (newValue) => {
    setInputValue(newValue as number);
  };

  //antd のスライダー読み込み不具合に対応する処理
  useEffect(() => {
    const sliderTrack =
      document.querySelector<HTMLElement>(".ant-slider-track");
    if (sliderTrack) {
      sliderTrack.style.width = "75%";
    }
    const sliderHandle =
      document.querySelector<HTMLElement>(".ant-slider-handle");
    if (sliderHandle) {
      sliderHandle.style.left = "75%";
    }
  }, []);

  return (
    <div className="flex flex-row gap-3">
      <div className="w-[65%]">
        <Slider
          min={1}
          max={100}
          onChange={onChange}
          value={inputValue || 75}
        />
      </div>
      <div>
        <InputNumber
          min={1}
          max={100}
          value={inputValue || 75}
          onChange={onChange}
          onBlur={() => {
            if (!inputValue) {
              setInputValue(75);
            }
          }}
        />
      </div>
    </div>
  );
};

export default function Quality() {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-bold text-white tracking-wider">
        Quality
      </span>
      <IntegerStep />
    </div>
  );
}
