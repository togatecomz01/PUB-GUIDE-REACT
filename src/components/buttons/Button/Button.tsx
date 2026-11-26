import { cx } from '../../../utils/cx.ts';
import type { ComponentPropsWithRef } from 'react';
import styles from './Button.module.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type ButtonSize = 'l' | 'm' | 's';

export type ButtonProps = Omit<ComponentPropsWithRef<'button'>, 'size'> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

/* 크기와 종류에 맞춰 기본 버튼 표시 */
export default function Button({
  variant = 'primary',
  size = 'l',
  type = 'button',
  className = '',
  children = '버튼',
  ...props
}: ButtonProps) {
  const isPlainLabel = typeof children === 'string' || typeof children === 'number';

  return (
    <button
      {...props}
      type={type}
      className={cx(styles.button, styles[variant], styles[size], className)}
    >
      {isPlainLabel ? <span className={styles.label}>{children}</span> : children}
    </button>
  );
}
