"use client";

export default function BaseModal({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 bg-black/50 flex justify-center items-center z-50">
      <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50">
        <section className="bg-white rounded-lg px-6 py-6 min-w-[300px] flex flex-col gap-4 justify-center items-center modal-open-animation relative">
          {children}
        </section>
      </div>
    </div>
  );
}
