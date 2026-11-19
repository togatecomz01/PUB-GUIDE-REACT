import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import Icon from '../Icon/Icon.tsx';
import { cx } from '../../utils/cx.ts';
import styles from './Toast.module.scss';
export type ToastProps = {
  open: boolean;
  message: string;
  onClose: () => void;
  duration?: number;
  icon?: ReactNode | false;
  position?: 'fixed' | 'inline';
  className?: string;
};
export default function Toast({
  open,
  message,
  onClose,
  duration = 3000,
  icon,
  position = 'fixed',
  className,
}: ToastProps) {
  const close = useRef(onClose);
  useEffect(() => {
    close.current = onClose;
  }, [onClose]);
  useEffect(() => {
    if (!open || duration <= 0) return;
    const timer = window.setTimeout(() => close.current(), duration);
    return () => window.clearTimeout(timer);
  }, [open, message, duration]);
  return (
    <div
      className={cx(styles.live, position === 'fixed' && styles.fixed, className)}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {open && (
        <div className={styles.toast}>
          {icon !== false && (
            <span className={styles.icon}>{icon ?? <Icon name="check" size={16} />}</span>
          )}
          <span>{message}</span>
        </div>
      )}
    </div>
  );
}
