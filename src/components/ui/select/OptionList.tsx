import clsx from "clsx";
import { Option } from "@/lib/forms/useSelect";
import { RefObject } from "react";

type Props = {
  options: Option[];
  listRef: RefObject<HTMLUListElement | null>;
  highlightIndex: number;
  value?: string;
  onHover: (index: number) => void;
  onPick: (value: string) => void;
  noOptionsText?: string;
};
export function OptionList({
  options,
  listRef,
  highlightIndex,
  value,
  onHover,
  onPick,
  noOptionsText = "Ничего не найдено",
}: Props) {
  const hasOptions = options.length > 0;

  return (
    <ul
      ref={listRef}
      role="listbox"
      className={clsx(
        "absolute z-50 mt-1 w-full max-h-70 overflow-auto",
        "bg-white border border-gray-400 rounded-[5px] shadow"
      )}
    >
      {!hasOptions ? (
        <li className="px-3 py-2 text-gray-500 select-none">{noOptionsText}</li>
      ) : (
        options.map((opt, idx) => {
          const isActive = idx === highlightIndex;
          const isSelected = opt.value === value;
          return (
            <li
              key={opt.value}
              role="option"
              aria-selected={isSelected}
              className={clsx(
                "px-3 py-2 cursor-pointer",
                isActive && "bg-gray-100",
                isSelected && "font-medium"
              )}
              onMouseEnter={() => onHover(idx)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => onPick(opt.value)}
            >
              {opt.label}
            </li>
          );
        })
      )}
    </ul>
  );
}
