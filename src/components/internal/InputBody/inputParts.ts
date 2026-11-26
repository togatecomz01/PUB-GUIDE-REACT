import type { ComponentPropsWithRef } from 'react';
import type { FieldIds } from '../FieldFrame/FieldFrame.tsx';

export type InputPartProps = {
  ids: FieldIds;
  inputProps: ComponentPropsWithRef<'input'>;
  value: string;
  onValueChange: (value: string) => void;
};

/* 입력값에서 숫자만 남기기 */
export const digits = (value: string) => value.replace(/\D/g, '');
