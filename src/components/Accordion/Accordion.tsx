import { useId, useState } from 'react';
import type { ReactNode } from 'react';
import Icon from '../Icon/Icon.tsx';
import { cx } from '../../utils/cx.ts';
import styles from './Accordion.module.scss';
export type AccordionProps = {
  title: string;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
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
  headingLevel = 2,
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
  const Heading = `h${headingLevel}` as const;
  /* 제목 버튼 클릭 시 내용 펼치기·접기 */
  function toggle() {
    if (open === undefined) setLocal(!expanded);
    onOpenChange?.(!expanded);
  }
  return (
    <div className={cx(styles.accordion, styles[variant], className)}>
      <Heading className={styles.heading}>
        <button type="button" aria-expanded={expanded} aria-controls={id} onClick={toggle}>
          <span className={styles.title}>
            {variant === 'full' && icon && <Icon name="alert_circle" />}
            {title}
          </span>
          <Icon name={expanded ? 'chevron_up' : 'chevron_down'} size={24} />
        </button>
      </Heading>
      <div id={id} hidden={!expanded} className={styles.body}>
        {children}
      </div>
    </div>
  );
}
