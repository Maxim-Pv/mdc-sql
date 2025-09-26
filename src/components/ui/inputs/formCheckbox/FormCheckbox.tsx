import { formSchema } from '@/lib/zod/formSchema';
import { IconCheck } from '@tabler/icons-react';
import clsx from 'clsx';
import { Controller, UseFormTrigger } from 'react-hook-form';
import z from 'zod';

type FormValues = z.infer<typeof formSchema>;
interface FormCheckboxProps {
  name: string;
  control: any;
  label: string;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  trigger?: UseFormTrigger<FormValues>;
  error?: boolean;
  onLabelClick?: () => void;
}

export const FormCheckbox = ({
  name,
  control,
  label,
  disabled = false,
  className = '',
  labelClassName = 'whitespace-nowrap',
  trigger,
  error,
  onLabelClick,
}: FormCheckboxProps) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const handleChange = (checked: boolean) => {
          field.onChange(checked);

          if (trigger && (name === 'isCitizen' || name === 'isNotCitizen')) {
            trigger(['isCitizen', 'isNotCitizen']);
          }
        };

        return (
          <button
            type="button"
            onClick={() => handleChange(!field.value)}
            onBlur={field.onBlur}
            disabled={disabled}
            className={clsx(
              'flex h-[20px] w-[20px] shrink-0 cursor-pointer items-center justify-center rounded border transition-colors',
              !error && !field.value && 'bg-white',
              field.value ? 'border-[#FDB51B] bg-[#FDB51B]' : 'border-gray-400',
              disabled && 'cursor-not-allowed opacity-50',
              error && 'border-red-500 bg-red-100',
            )}
          >
            {field.value && <IconCheck size={16} className="text-white" />}
          </button>
        );
      }}
    />
    <span
      className={clsx(labelClassName)}
      onClick={onLabelClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onLabelClick?.();
      }}
    >
      {label}
    </span>
  </div>
);
