import type { ReactNode } from 'react';
import { cx } from '../../../utils/cx.ts';
import styles from './FieldFrame.module.scss';

export type FieldName =
  | { label: string; 'aria-label'?: string; 'aria-labelledby'?: string }
  | { label?: string; 'aria-label': string; 'aria-labelledby'?: string }
  | { label?: string; 'aria-label'?: string; 'aria-labelledby': string };
export type FieldState = 'default' | 'error' | 'success';
export type FieldIds = {
  id: string;
  describedBy?: string;
  invalid?: true;
  accessibleName: string;
  labelledBy?: string;
};
export type FieldOptions = {
  id?: string;
  helperText?: ReactNode;
  status?: FieldState;
  disabled?: boolean;
  className?: string;
  'aria-describedby'?: string;
};
type FieldFrameProps = FieldOptions & {
  id: string;
  label?: string;
  children: ReactNode;
};

function isHelperVisible(helperText: ReactNode) {
  return helperText != null && helperText !== '' && helperText !== false;
}

/* 부모가 만든 ID로 입력칸·레이블·안내문구의 연결 정보를 준비 */
export function getFieldIds(id: string, options: FieldName & FieldOptions): FieldIds {
  const { label, helperText, status } = options;
  const describedBy =
    cx(options['aria-describedby'], isHelperVisible(helperText) && `${id}-help`) || undefined;

  return {
    id,
    describedBy,
    invalid: status === 'error' ? true : undefined,
    accessibleName: options['aria-label'] ?? label ?? '',
    labelledBy: options['aria-labelledby'],
  };
}

export default function FieldFrame({
  id,
  label,
  helperText,
  status = 'default',
  disabled,
  className,
  children,
}: FieldFrameProps) {
  const isLabelVisible = Boolean(label);
  const isHelpVisible = isHelperVisible(helperText);

  return (
    <div
      className={cx(styles.root, className)}
      data-status={status}
      data-disabled={disabled || undefined}
    >
      {isLabelVisible && (
        <label className={styles.label} htmlFor={id} id={`${id}-label`}>
          {label}
        </label>
      )}
      {children}
      {isHelpVisible && (
        <p className={styles.help} id={`${id}-help`}>
          {helperText}
        </p>
      )}
    </div>
  );
}
