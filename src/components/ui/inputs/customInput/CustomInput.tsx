import { IMaskInput } from "react-imask";
import clsx from "clsx";

export default function CustomInput({
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  className,
  isMasked,
}: {
  name: string;
  value?: string;
  onChange?: (...event: any[]) => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: any;
  className?: string;
  isMasked?: boolean;
}) {
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
          className={clsx(
            "border rounded px-3 py-2 w-full",
            className,
            error && "border-red-500"
          )}
        />
      ) : (
        <input
          name={name}
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          className={clsx(
            "border rounded px-3 py-2 w-full",
            className,
            error && "border-red-500"
          )}
        />
      )}
      <div className="h-[20px] mt-1 ml-2">
        {error && <p className="text-red-500 text-sm">{error.message}</p>}
      </div>
    </div>
  );
}
