import { OptionList } from '@/components/ui/select/OptionList';
import { useSelect } from '@/lib/forms/useSelect';
import { IconChevronDown, IconLoader2 } from '@tabler/icons-react';
import clsx from 'clsx';
import type { ChangeEvent, InputHTMLAttributes } from 'react';
import type { FieldError } from 'react-hook-form';

type BaseInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'defaultValue'>;

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
  readOnlyInput?: boolean;
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
  placeholder = 'Выберите...',
  loading = false,
  noOptionsText = 'Ничего не найдено',
  clearable = true,
  onClear,
  readOnlyInput = false,
  ...props
}: SelectFieldProps) {
  const s = useSelect({
    value,
    options,
    onValueChange,
    onChange,
    name,
    onBlur,
    readOnlyInput,
  });

  // *** Доп функция очистки селекта (если понадобиться) ***
  // const emitClear = () => {
  //   // уведомим rhf (и onValueChange)
  //   onValueChange?.("");
  //   if (onChange) {
  //     const synthetic = {
  //       target: { value: "", name },
  //       currentTarget: { value: "", name },
  //     } as unknown as React.ChangeEvent<HTMLInputElement>;
  //     onChange(synthetic);
  //   }
  //   s.setInputValue("");
  //   s.setOpen(false);
  //   onClear?.();
  // };

  return (
    <div ref={s.containerRef} className={clsx('relative', wrapperClassName)}>
      <div className="relative">
        <input
          type="text"
          name={name}
          value={s.inputValue}
          readOnly={readOnlyInput}
          onClick={() => s.setOpen(true)}
          onChange={(e) => {
            if (readOnlyInput) return;
            s.setInputValue(e.target.value);
            s.setOpen(true);
          }}
          onFocus={() => s.setOpen(true)}
          onBlur={() => onBlur?.()}
          onKeyDown={s.onKeyDown}
          placeholder={loading ? 'Загрузка ...' : placeholder}
          autoComplete="off"
          className={clsx(
            'w-full cursor-text rounded border px-3 py-2',
            'overflow-hidden text-ellipsis whitespace-nowrap',
            selectClassName,
            { 'border-red-500': !!error },
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

        <div
          className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
          onClick={() => s.setOpen((p) => !p)}
          aria-hidden
        >
          {!loading ? (
            <IconChevronDown size={20} className={iconClassName} />
          ) : (
            <IconLoader2 size={18} className={clsx('animate-spin', iconClassName)} />
          )}
        </div>
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

      {error && <p className="mt-1 ml-2 text-[14px] text-red-500">{error.message}</p>}
    </div>
  );
}
