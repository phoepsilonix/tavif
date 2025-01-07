"use client";

import type { MenuProps } from "antd";
import { Dropdown, Button, Modal } from "antd";
import { useAtom } from "jotai";
import { isFocusedAtom } from "@/app/lib/atom";
import { useEffect, useRef, useState } from "react";

const items: MenuProps["items"] = [
  {
    label: <Help />,
    key: "0",
  },
];

export default function HelpMenu() {
  const [isFocused] = useAtom(isFocusedAtom);
  const helpButtonRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    const handleKeyDownSelectShortcut = async (event: KeyboardEvent) => {
      if (event.key === "h" && event.altKey && isFocused) {
        event.preventDefault();
        helpButtonRef.current?.click();
        helpButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDownSelectShortcut);

    return () => {
      window.removeEventListener("keydown", handleKeyDownSelectShortcut);
    };
  }, [isFocused]);

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Button
        onClick={() => {}}
        className="px-2 text-white bg-[#00b96b] border-none h-[99%]"
        ref={helpButtonRef}
      >
        Help(H)
      </Button>
    </Dropdown>
  );
}

function Help(): React.ReactNode {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        Show License
      </button>
      <Modal
        open={isModalOpen}
        onOk={() => {
          setIsModalOpen(false);
        }}
        centered
        cancelButtonProps={{ hidden: true }}
        maskClosable={true}
        closable={false}
      >
        <section className="max-h-[80vh] overflow-y-auto p-2">
          <h1 className="text-2xl font-bold w-full text-center">License</h1>
          <p>
            MIT License
            <span className="pt-2 block" />
            Copyright (c) 2025 Moriya Harumi
            <span className="pt-2 block" />
            Permission is hereby granted, free of charge, to any person
            obtaining a copy of this software and associated documentation files
            (the &quot;Software&quot;), to deal in the Software without
            restriction, including without limitation the rights to use, copy,
            modify, merge, publish, distribute, sublicense, and/or sell copies
            of the Software, and to permit persons to whom the Software is
            furnished to do so, subject to the following conditions:
            <span className="pt-2 block" />
            The above copyright notice and this permission notice shall be
            included in all copies or substantial portions of the Software.
            <span className="pt-2 block" />
            THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY
            KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
            WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
            NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
            BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
            ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
            CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
            SOFTWARE.
          </p>
        </section>
      </Modal>
    </>
  );
}
