import clsx from "clsx";
import { useSelect } from "@/lib/forms/useSelect";
import { OptionList } from "@/components/ui/select/OptionList";
import type { FieldError } from "react-hook-form";
import type { InputHTMLAttributes, ChangeEvent } from "react";
import { IconChevronDown, IconLoader2, IconX } from "@tabler/icons-react";

type BaseInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value" | "defaultValue"
>;

interface SelectFieldProps extends BaseInputProps {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onValueChange?: (value: string) => void;

  onBlur?: () => void;
  name: string;
  error?: FieldError;

  options: { label: string; value: string }[];

  wrapperClassName?: string;
  selectClassName?: string;
  iconClassName?: string;

  placeholder?: string;
  loading?: boolean;
  noOptionsText?: string;

  clearable?: boolean;
  onClear?: () => void;
}

export default function CustomSelect({
  value,
  onChange,
  onValueChange,
  onBlur,
  name,
  error,
  options,
  wrapperClassName,
  selectClassName,
  iconClassName,
  placeholder = "Выберите...",
  loading = false,
  noOptionsText = "Ничего не найдено",
  clearable = true,
  onClear,
  ...props
}: SelectFieldProps) {
  const s = useSelect({
    value,
    options,
    onValueChange,
    onChange,
    name,
    onBlur,
  });

  const emitClear = () => {
    // уведомим rhf (и onValueChange)
    onValueChange?.("");
    if (onChange) {
      const synthetic = {
        target: { value: "", name },
        currentTarget: { value: "", name },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onChange(synthetic);
    }
    s.setInputValue("");
    s.setOpen(false);
    onClear?.();
  };

  return (
    <div ref={s.containerRef} className={clsx("relative", wrapperClassName)}>
      <div className="relative">
        <input
          type="text"
          name={name}
          value={s.inputValue}
          onChange={(e) => {
            s.setInputValue(e.target.value);
            s.setOpen(true);
          }}
          onFocus={() => s.setOpen(true)}
          onBlur={() => onBlur?.()}
          onKeyDown={s.onKeyDown}
          placeholder={loading ? "Загрузка офисов..." : placeholder}
          autoComplete="off"
          className={clsx(
            "w-full px-3 py-2 border rounded cursor-text",
            "overflow-hidden text-ellipsis whitespace-nowrap",
            selectClassName,
            { "border-red-500": !!error }
          )}
          {...props}
        />

        {/* Кнопка очистки */}
        {/* {clearable && (value || s.inputValue) && !loading && (
          <button
            type="button"
            aria-label="Очистить"
            onClick={emitClear}
            className="absolute right-8 top-1/2 -translate-y-1/2 px-1 text-gray-500 hover:text-gray-700"
          >
            <IconX size={18} />
          </button>
        )} */}

        {!loading ? (
          <IconChevronDown
            className={clsx(
              "absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none",
              iconClassName
            )}
            size={20}
          />
        ) : (
          <IconLoader2
            className={clsx(
              "absolute right-3 top-1/2 -translate-y-1/2 animate-spin pointer-events-none",
              iconClassName
            )}
            size={18}
          />
        )}
      </div>

      {s.open && !loading && (
        <OptionList
          options={s.filtered}
          listRef={s.listRef}
          highlightIndex={s.highlightIndex}
          value={value}
          onHover={s.setHighlightIndex}
          onPick={s.emitSelection}
          noOptionsText={noOptionsText}
        />
      )}

      {error && (
        <p className="ml-2 text-red-500 text-[14px] mt-1">{error.message}</p>
      )}
    </div>
  );
}
