import { useId, useState } from 'react';
import type { ReactNode } from 'react';
import Icon from '../Icon/Icon.tsx';
import { cx } from '../../utils/cx.ts';
import styles from './Accordion.module.scss';
export type AccordionProps = {
  title: string;
  children: ReactNode;
  variant?: 'full' | 'box';
  icon?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
};
/* 제목을 눌러 내용을 펼치고 접는 영역 표시 */
export default function Accordion({
  title,
  children,
  variant = 'full',
  icon = true,
  open,
  defaultOpen = false,
  onOpenChange,
  className,
}: AccordionProps) {
  const [local, setLocal] = useState(defaultOpen);
  const expanded = open ?? local;
  const id = useId();
  /* 제목 버튼 클릭 시 내용 펼치기·접기 */
  function toggle() {
    if (open === undefined) setLocal(!expanded);
    onOpenChange?.(!expanded);
  }
  return (
    <section className={cx(styles.root, styles[variant], className)}>
      <h2 className={styles.heading}>
        <button type="button" aria-expanded={expanded} aria-controls={id} onClick={toggle}>
          <span className={styles.title}>
            {variant === 'full' && icon && <Icon name="alert_circle" />}
            {title}
          </span>
          <Icon name={expanded ? 'chevron_up' : 'chevron_down'} size={24} />
        </button>
      </h2>
      <div id={id} hidden={!expanded} className={styles.body}>
        {children}
      </div>
    </section>
  );
}
