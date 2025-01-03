"use client";

import React from 'react';
import type { InputNumberProps } from 'antd';
import { Col, InputNumber, Row, Slider } from 'antd';
import { useAtom } from 'jotai';
import { qualityAtom } from '@/app/atom';

const IntegerStep: React.FC = () => {
  const [inputValue, setInputValue] = useAtom(qualityAtom);

  const onChange: InputNumberProps['onChange'] = (newValue) => {
    setInputValue(newValue as number);
  };

  return (
    <Row>
      <Col span={12}>
        <Slider
          min={1}
          max={100}
          onChange={onChange}
          value={typeof inputValue === 'number' ? inputValue : 0}
        />
      </Col>
      <Col span={4}>
        <InputNumber
          min={1}
          max={100}
          style={{ margin: '0 16px' }}
          value={inputValue}
          onChange={onChange}
          onBlur={() => {
            if (!inputValue) {
              setInputValue(75);
            }
          }}
        />
      </Col>
    </Row>
  );
};

export default function Quality() {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-bold text-white tracking-wider">Quality</span>
      <IntegerStep />
    </div>
  );
}
