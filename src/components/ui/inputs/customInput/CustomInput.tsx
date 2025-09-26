import { IMaskInput } from 'react-imask';
import clsx from 'clsx';

interface Props {
  name: string;
  value?: string;
  onChange?: (...event: any[]) => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: any;
  className?: string;
  isMasked?: boolean;
}
export default function CustomInput({ name, value, onChange, onBlur, placeholder, error, className, isMasked }: Props) {
  return (
    <div>
      {isMasked ? (
        <IMaskInput
          mask="+{7} (000) 000-00-00"
          lazy={false}
          overwrite
          value={value}
          onAccept={(val) => onChange?.(val)}
          onBlur={onBlur}
          name={name}
          className={clsx('w-full rounded border px-3 py-2', className, error && 'border-red-500')}
        />
      ) : (
        <input
          name={name}
          value={value ?? ''}
          onChange={(e) => onChange?.(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          className={clsx('w-full rounded border px-3 py-2', className, error && 'border-red-500')}
        />
      )}
      <div className="mt-1 ml-2 h-[20px]">{error && <p className="text-sm text-red-500">{error.message}</p>}</div>
    </div>
  );
}
