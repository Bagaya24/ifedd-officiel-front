import React, { useEffect } from "react";

type Size = "sm" | "md" | "lg" | "xl" | string;

interface ModalProps {
  title?: React.ReactNode;
  headerColor?: string; // hex or css color
  size?: Size;
  open: boolean;
  setOpen: (open: boolean) => void;
  children?: React.ReactNode;
  className?: string;
  overflow?: boolean;
}

/**
 * Reusable Modal component
 * - Accessible: focus trap is not implemented (kept minimal), but supports Escape to close and click-outside to close
 * - Theme-aware: uses `dark:` Tailwind utilities when system is in dark mode
 * - Props: `title`, `headerColor`, `size`, `open`, `setOpen`
 */
export default function Modals({
  title,
  headerColor = "#82b88a",
  size = "md",
  open,
  setOpen,
  children,
  className = "",
  overflow = true,
}: ModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  if (!open) return null;

  const sizeClass =
    typeof size === "string" && ["sm", "md", "lg", "xl"].includes(size)
      ? size === "sm"
        ? "max-w-md"
        : size === "md"
          ? "max-w-2xl"
          : size === "lg"
            ? "max-w-4xl"
            : "max-w-6xl"
      : `max-w-[${size}]`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        aria-hidden
      />

      <div
        className={`relative w-full ${sizeClass} mx-4 ${className}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="bg-white  rounded-lg shadow-lg overflow-hidden">
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ background: headerColor, color: "#fff" }}
          >
            <div className="text-sm font-semibold">{title}</div>
            <button
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="text-white hover:opacity-90 px-2 py-1 rounded focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div
            className={`p-4 text-sm text-gray-700 lg:max-h-200 max-h-150 ${overflow ? "overflow-y-scroll" : ""}`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
