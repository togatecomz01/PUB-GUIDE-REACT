import type { ComponentPropsWithRef, ReactNode } from 'react';
import SelectionImages from '../internal/SelectionImages/SelectionImages.tsx';
import { switchImages } from '../../utils/assets.ts';
import { cx } from '../../utils/cx.ts';
import styles from './Switch.module.scss';

export type SwitchProps = Omit<
  ComponentPropsWithRef<'input'>,
  'type' | 'size' | 'role' | 'children'
> & { size?: 's' | 'm'; label?: ReactNode };

/* 켜짐·꺼짐을 바꾸는 스위치 표시 */
export default function Switch({ size = 'm', label, className, disabled, ...input }: SwitchProps) {
  return (
    <label
      className={cx(styles.root, styles[size], className)}
      data-disabled={disabled || undefined}
    >
      <input
        {...input}
        className={styles.input}
        type="checkbox"
        role="switch"
        disabled={disabled}
      />
      <span className={styles.visual} aria-hidden="true">
        <SelectionImages images={switchImages[size]} />
      </span>
      {label != null && <span className={styles.label}>{label}</span>}
    </label>
  );
}
