import { Controller } from "react-hook-form";
import CustomInput from "../customInput/CustomInput";

interface FormInputProps {
  name: string;
  control: any;
  error?: any;
  placeholder: string;
  className?: string;
  isMasked?: boolean;
}

export const FormInput = ({
  name,
  control,
  error,
  placeholder,
  className,
  isMasked = false,
}: FormInputProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <CustomInput
        {...field}
        placeholder={placeholder}
        error={error}
        className={className}
        isMasked={isMasked}
      />
    )}
  />
);
