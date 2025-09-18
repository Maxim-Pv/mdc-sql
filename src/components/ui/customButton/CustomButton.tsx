import React from "react";
import clsx from "clsx";
import st from "./styles.module.css";
import Spinner from "../spinner/Spinner";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  full?: boolean;
  title: string;
  onClick?: () => void;
  loading?: boolean;
}

export default function CustomButton({
  children,
  onClick,
  className,
  full = false,
  title,
  disabled = false,
  loading = false,
  ...props
}: CustomButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={clsx(st.primaryButton, full && st.fullWidth, className)}
      onClick={onClick}
    >
      {loading ? <Spinner size={24} color="black" /> : children || title}
    </button>
  );
}
