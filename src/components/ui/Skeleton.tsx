export type Props = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export function Skeleton({ className = "", ...props }: Props) {
  return (
    <div className={`bg-gray-200 animate-pulse ${className}`} {...props} />
  );
}

// components/Block.tsx
import { ReactNode } from "react";

type BlockProps = {
  title: string | ReactNode;
  loading: boolean;
  /** сколько строк скелетона под заголовком */
  skeletonLines?: number;
  children: ReactNode;
};

export function Block({
  title,
  loading,
  skeletonLines = 1,
  children,
}: BlockProps) {
  return (
    <div className="">
      <div className="">
        {loading ? <Skeleton className="w-24 h-6 rounded" /> : title}
      </div>
      <div className="">
        {loading
          ? Array.from({ length: skeletonLines }).map((_, i) => (
              <Skeleton
                key={i}
                className={
                  i === 0 ? "w-full h-8 rounded" : "w-1/2 h-4 mt-2 rounded"
                }
              />
            ))
          : children}
      </div>
    </div>
  );
}
