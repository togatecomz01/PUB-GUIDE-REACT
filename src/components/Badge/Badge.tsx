import type { ComponentPropsWithoutRef } from 'react';
import { cx } from '../../utils/cx.ts';
import styles from './Badge.module.scss';
type Tone = 'brand' | 'error' | 'success' | 'warning' | 'gray';
export type BadgeProps = ComponentPropsWithoutRef<'span'> & {
  size?: 'l' | 's';
} & ({ variant?: 'line'; tone?: Tone } | { variant: 'fill'; tone?: Tone | 'brand-weak' });
/* 종류와 색상에 맞춰 상태 배지 표시 */
export default function Badge({
  variant = 'line',
  tone = 'brand',
  size = 'l',
  className,
  children,
  ...props
}: BadgeProps) {
  const isPlainLabel = typeof children === 'string' || typeof children === 'number';

  return (
    <span
      {...props}
      className={cx(styles.badge, styles[variant], styles[tone], styles[size], className)}
    >
      {isPlainLabel ? <span className={styles.label}>{children}</span> : children}
    </span>
  );
}
