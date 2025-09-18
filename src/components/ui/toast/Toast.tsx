"use client";
import { IconCircleCheck, IconX } from "@tabler/icons-react";
import st from "./styles.module.css";
import { useEffect } from "react";

interface ToastProps {
  title: string;
  description?: string;
  onClose: () => void;
  variant?: "success" | "error";
}

export const Toast = ({
  title,
  description,
  onClose,
  variant = "success",
}: ToastProps) => {
  const Icon = variant === "error" ? IconX : IconCircleCheck;
  const iconColor = variant === "error" ? "text-red-500" : "text-green-500";
  useEffect(() => {
    if (variant === "error") {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [variant, onClose]);

  return (
    <div className={`${st.toast} ${variant === "error" ? st.toastError : ""}`}>
      <Icon className={`${iconColor} mt-0.5`} size={24} />
      <div className="flex-1">
        <p className="font-semibold text-sm text-gray-900">{title}</p>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-700 cursor-pointer"
      >
        <IconX size={18} />
      </button>
    </div>
  );
};
