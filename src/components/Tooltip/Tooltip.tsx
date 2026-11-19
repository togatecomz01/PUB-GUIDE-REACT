import { useEffect, useId, useRef, useState } from 'react';
import type { ReactNode, KeyboardEvent } from 'react';
import Icon from '../Icon/Icon.tsx';
import { cx } from '../../utils/cx.ts';
import styles from './Tooltip.module.scss';
export type TooltipProps = {
  label: string;
  title: string;
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
};
export default function Tooltip({
  label,
  title,
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  className,
}: TooltipProps) {
  const [local, setLocal] = useState(defaultOpen);
  const expanded = open ?? local;
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  function update(next: boolean) {
    if (open === undefined) setLocal(next);
    onOpenChange?.(next);
  }
  useEffect(() => {
    if (!expanded) return;
    function outside(event: PointerEvent) {
      const isOutside = event.target instanceof Node && !root.current?.contains(event.target);
      if (isOutside) {
        update(false);
      }
    }
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  });
  function close() {
    update(false);
    trigger.current?.focus();
  }
  function toggle() {
    update(!expanded);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'Escape' || !expanded) return;
    event.preventDefault();
    event.stopPropagation();
    close();
  }

  return (
    <div ref={root} className={cx(styles.root, className)} onKeyDown={handleKeyDown}>
      <button
        ref={trigger}
        type="button"
        className={styles.trigger}
        aria-expanded={expanded}
        aria-controls={id}
        onClick={toggle}
      >
        {label}
        <Icon name="help_circle" size={16} />
      </button>
      {expanded && (
        <section id={id} className={styles.box} aria-labelledby={id + '-title'}>
          <header className={styles.heading}>
            <h3 id={id + '-title'}>{title}</h3>
            <button type="button" aria-label={title + ' 닫기'} onClick={close}>
              <Icon name="close" size={24} />
            </button>
          </header>
          <div className={styles.body}>{children}</div>
        </section>
      )}
    </div>
  );
}
