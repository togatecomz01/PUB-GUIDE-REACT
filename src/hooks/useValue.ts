import { useState } from 'react';

export function useValue(
  value: string | undefined,
  defaultValue: string,
  onValueChange?: (value: string) => void,
) {
  const [internal, setInternal] = useState(defaultValue);
  function update(next: string) {
    if (value === undefined) setInternal(next);
    onValueChange?.(next);
  }
  return [value ?? internal, update] as const;
}
