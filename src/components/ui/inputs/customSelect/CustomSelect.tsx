import { OptionList } from '@/components/ui/select/OptionList';
import { useSelect } from '@/lib/forms/useSelect';
import { IconChevronDown, IconLoader2, IconX } from '@tabler/icons-react';
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
  onInputChange?: (q: string) => void;
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
  onInputChange,
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

  const emitClear = () => {
    onValueChange?.('');
    if (onChange) {
      const synthetic = {
        target: { value: '', name },
        currentTarget: { value: '', name },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onChange(synthetic);
    }
    s.setInputValue('');
    s.setOpen(true);
    onClear?.();
  };

  const showClearIcon = clearable && (Boolean(value) || Boolean(s.inputValue)) && s.open && !loading;

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
            onInputChange?.(e.target.value);
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
            {
              'border-red-500': !!error,
            },
          )}
          {...props}
        />

        <div
          className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            if (!loading && !showClearIcon) s.setOpen((p) => !p);
          }}
          aria-hidden
        >
          {loading ? (
            <IconLoader2 size={18} className={clsx('animate-spin', iconClassName)} />
          ) : showClearIcon ? (
            <IconX
              size={18}
              className={iconClassName}
              onClick={(e) => {
                e.stopPropagation();
                emitClear();
              }}
              aria-label="Очистить"
            />
          ) : (
            <IconChevronDown size={20} className={iconClassName} />
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
