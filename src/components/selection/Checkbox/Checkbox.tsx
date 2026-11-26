import type { ComponentPropsWithRef, ReactNode } from 'react';
import SelectionImages from '../SelectionImages/SelectionImages.tsx';
import { checkboxImages } from '../../../utils/assets.ts';
import { cx } from '../../../utils/cx.ts';
import styles from './Checkbox.module.scss';

export type CheckboxProps = Omit<ComponentPropsWithRef<'input'>, 'type' | 'size' | 'children'> & {
  variant?: 'square' | 'line' | 'box';
  size?: 's' | 'm';
  label?: ReactNode;
};

/* 사각형·라인·박스 형태의 체크박스 표시 */
export default function Checkbox({
  variant = 'square',
  size = 's',
  label,
  className,
  disabled,
  ...input
}: CheckboxProps) {
  const isBox = variant === 'box';
  const imageVariant = isBox ? 'square' : variant;
  const images = checkboxImages[imageVariant][size];
  return (
    <label
      className={cx(styles.root, styles[variant], styles[size], className)}
      data-disabled={disabled || undefined}
    >
      <input {...input} className={styles.input} type="checkbox" disabled={disabled} />
      <span className={styles.visual} aria-hidden="true">
        {!isBox && <SelectionImages images={images} />}
      </span>
      {label != null && <span className={styles.label}>{label}</span>}
    </label>
  );
}
