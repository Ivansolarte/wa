import { useEffect, useState } from "react";

export const Modal = ({ children }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 10); // permite que se renderice antes de animar
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="relative z-30"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500/75 transition-opacity duration-300"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all duration-300 sm:my-8 w-[650px] ${
              show ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
