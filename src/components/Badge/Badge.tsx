import type { ComponentPropsWithoutRef } from 'react';
import { cx } from '../../utils/cx.ts';
import styles from './Badge.module.scss';
type Tone = 'brand' | 'error' | 'success' | 'warning' | 'gray';
export type BadgeProps = ComponentPropsWithoutRef<'span'> & {
  size?: 'l' | 's';
} & ({ variant?: 'line'; tone?: Tone } | { variant: 'fill'; tone?: Tone | 'brand-weak' });
export default function Badge({
  variant = 'line',
  tone = 'brand',
  size = 'l',
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      {...props}
      className={cx(styles.badge, styles[variant], styles[tone], styles[size], className)}
    />
  );
}
