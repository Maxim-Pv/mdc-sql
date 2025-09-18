import { IconLoader } from "@tabler/icons-react";
import clsx from "clsx";

interface SpinnerProps {
  size?: number; // в пикселях
  color?: string;
  className?: string;
}

export default function Spinner({
  size = 24,
  color = "#FDB51B",
  className,
}: SpinnerProps) {
  return (
    <div role="status" className={clsx("animate-spin", className)}>
      <IconLoader size={size} color={color} stroke={2} />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
