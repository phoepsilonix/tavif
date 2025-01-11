import BaseModal from "../BaseModal/BaseModal";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useAtom } from "jotai";
import { isLicenseDialogOpenAtom } from "../../lib/atom";

function WarningDialog({ children }: { children: React.ReactNode }) {
  return (
    <BaseModal>
      <div className="flex flex-col gap-2 justify-center items-center">
        <p className="text-lg font-medium text-yellow-500 w-full justify-center flex items-center gap-2">
          <ExclamationCircleOutlined twoToneColor="#eab308" />
          Warning
        </p>
        {children}
      </div>
    </BaseModal>
  );
}

function ErrorDialog({ children }: { children: React.ReactNode }) {
  return (
    <BaseModal>
      <div className="flex flex-col gap-2 justify-center items-center">
        <p className="text-lg font-medium text-red-500 w-full justify-center flex items-center gap-2">
          <ExclamationCircleOutlined twoToneColor="#eab308" />
          Error
        </p>
        {children}
      </div>
    </BaseModal>
  );
}

function LicenseDialog() {
  const [isLicenseDialogOpen, setIsLicenseDialogOpen] = useAtom(isLicenseDialogOpenAtom);
  return (
    isLicenseDialogOpen && (
      <BaseModal>
        <section className="max-h-[80vh] overflow-y-auto p-2 max-w-[70vw]">
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
            The software is provided &quot;as is&quot;, without warranty of any
            kind, express or implied, including but not limited to the
            warranties of merchantability, fitness for a particular purpose and
            noninfringement. In no event shall the authors or copyright holders
            be liable for any claim, damages or other liability, whether in an
            action of contract, tort or otherwise, arising from, out of or in
            connection with the software or the use or other dealings in the
            software.
          </p>
        </section>
        <div className="flex flex-row-reverse w-full pr-2">
          <button
            className="bg-primary text-white border-none h-[98%] p-[4px_16px] text-lg tracking-wider hover:bg-[#84ddb8] rounded-md transition-all duration-200"
            onClick={() => {
              setIsLicenseDialogOpen(false);
            }}
          >
            Close
          </button>
        </div>
      </BaseModal>
    )
  );
}

export { WarningDialog, ErrorDialog, LicenseDialog };
