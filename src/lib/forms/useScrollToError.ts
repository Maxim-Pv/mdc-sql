import { useCallback } from 'react';
import type { SubmitErrorHandler, FieldErrors } from 'react-hook-form';
import { scrollToField } from './scrollToField';

export function useScrollToError<T extends Record<string, any>>(
  fieldOrder: Array<keyof T | string>,
  extraTarget?: (errors: FieldErrors<T>) => string | undefined,
): SubmitErrorHandler<T> {
  return useCallback<SubmitErrorHandler<T>>(
    (errors) => {
      const firstWithError = fieldOrder.find((name) => !!errors[String(name)]);
      const target = (firstWithError as string) ?? extraTarget?.(errors);
      if (target) {
        scrollToField(target, { center: true, focus: true, delayFocusMs: 350 });
      }
    },
    [fieldOrder, extraTarget],
  );
}
