import type { ComponentPropsWithRef, ReactNode } from 'react';
import SelectionImages from '../internal/SelectionImages/SelectionImages.tsx';
import { radioImages } from '../../utils/assets.ts';
import { cx } from '../../utils/cx.ts';
import styles from './Radio.module.scss';

export type RadioProps = Omit<ComponentPropsWithRef<'input'>, 'type' | 'size' | 'children'> & {
  size?: 's' | 'm';
  label?: ReactNode;
};

export default function Radio({ size = 's', label, className, disabled, ...input }: RadioProps) {
  return (
    <label
      className={cx(styles.root, styles[size], className)}
      data-disabled={disabled || undefined}
    >
      <input {...input} className={styles.input} type="radio" disabled={disabled} />
      <span className={styles.visual} aria-hidden="true">
        <SelectionImages images={radioImages[size]} />
      </span>
      {label != null && <span className={styles.label}>{label}</span>}
    </label>
  );
}
