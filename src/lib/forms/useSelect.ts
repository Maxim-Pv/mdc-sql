import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type Option = { label: string; value: string };

export function useSelect({
  value,
  options,
  onValueChange,
  onChange,
  name,
  onBlur,
}: {
  value?: string;
  options: Option[];
  onValueChange?: (value: string) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  onBlur?: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedLabel = useMemo(
    () => options.find((o) => o.value === value)?.label ?? "",
    [options, value]
  );

  const [inputValue, setInputValue] = useState<string>(selectedLabel);
  const [open, setOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);

  useEffect(() => setInputValue(selectedLabel), [selectedLabel]);

  // клик вне — закрыть
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        onBlur?.();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onBlur]);

  const filtered = useMemo(() => {
    const q = inputValue.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, inputValue]);

  useEffect(() => setHighlightIndex(0), [inputValue]);

  const emitSelection = useCallback(
    (val: string) => {
      onValueChange?.(val);

      if (onChange) {
        const synthetic = {
          target: { value: val, name },
          currentTarget: { value: val, name },
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        onChange(synthetic);
      }

      setOpen(false);
      setInputValue(options.find((o) => o.value === val)?.label ?? "");
    },
    [name, onChange, onValueChange, options]
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
        setOpen(true);
        e.preventDefault();
        return;
      }
      if (!open) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightIndex((i) =>
          Math.min(i + 1, Math.max(filtered.length - 1, 0))
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = filtered[highlightIndex];
        if (item) emitSelection(item.value);
      } else if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
    },
    [emitSelection, filtered, highlightIndex, open]
  );

  // автопрокрутка к подсвеченному элементу
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const li = list.querySelectorAll("li")[highlightIndex] as
      | HTMLLIElement
      | undefined;
    if (!li) return;
    const liTop = li.offsetTop;
    const liBottom = liTop + li.offsetHeight;
    const viewTop = list.scrollTop;
    const viewBottom = viewTop + list.clientHeight;
    if (liTop < viewTop) list.scrollTop = liTop;
    else if (liBottom > viewBottom)
      list.scrollTop = liBottom - list.clientHeight;
  }, [highlightIndex, open]);

  return {
    // state/refs
    containerRef,
    listRef,
    inputValue,
    open,
    highlightIndex,
    filtered,
    selectedLabel,

    // setters/handlers
    setInputValue,
    setOpen,
    setHighlightIndex,
    emitSelection,
    onKeyDown,
  };
}
