import { useId, useRef } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import { useValue } from '../../../hooks/useValue.ts';
import { cx } from '../../../utils/cx.ts';
import { useHorizontalDrag } from '../../../hooks/useHorizontalDrag.ts';

export type TabItem = { value: string; label: ReactNode; content?: ReactNode; disabled?: boolean };
export type TabProps = {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  'aria-label': string;
  className?: string;
};
type TabListProps = TabProps & { styles: Record<string, string>; fixedItems?: boolean };

/* 탭 선택값에 맞춰 메뉴와 연결된 내용 표시 */
export default function TabList({
  items,
  value,
  defaultValue,
  onValueChange,
  'aria-label': ariaLabel,
  className,
  styles,
  fixedItems = false,
}: TabListProps) {
  const id = useId();
  const drag = useHorizontalDrag(items);
  const buttons = useRef(new Map<string, HTMLButtonElement>());
  const first = items.find((item) => !item.disabled)?.value ?? '';
  const [current, update] = useValue(value, defaultValue ?? first, onValueChange);
  const isCurrentEnabled = items.some((item) => item.value === current && !item.disabled);
  const selected = isCurrentEnabled ? current : first;

  /* 방향키·Home·End 입력 시 선택 가능한 탭으로 이동 */
  function move(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const isNavigationKey = ['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key);
    if (!isNavigationKey) return;
    event.preventDefault();
    const enabled = items.filter((item) => !item.disabled);
    const position = enabled.findIndex((item) => item.value === items[index].value);
    let next;
    if (event.key === 'Home') {
      next = enabled[0];
    } else if (event.key === 'End') {
      next = enabled.at(-1);
    } else {
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      const nextIndex = (position + direction + enabled.length) % enabled.length;
      next = enabled[nextIndex];
    }
    if (!next) return;
    update(next.value);
    const nextButton = buttons.current.get(next.value);
    nextButton?.focus({ preventScroll: true });
    nextButton?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }

  return (
    <div className={cx(styles.root, className)}>
      <div
        {...drag}
        className={cx(styles.list, fixedItems && styles.fixed)}
        role="tablist"
        aria-label={ariaLabel}
      >
        {items.map((item, index) => (
          <button
            key={item.value}
            ref={(node) => {
              if (node) buttons.current.set(item.value, node);
              else buttons.current.delete(item.value);
            }}
            type="button"
            role="tab"
            id={`${id}-tab-${index}`}
            aria-selected={selected === item.value}
            aria-controls={item.content !== undefined ? `${id}-panel-${index}` : undefined}
            tabIndex={selected === item.value ? 0 : -1}
            disabled={item.disabled}
            className={styles.item}
            onClick={() => update(item.value)}
            onKeyDown={(event) => move(event, index)}
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.map(
        (item, index) =>
          item.content !== undefined && (
            <div
              key={item.value}
              role="tabpanel"
              id={`${id}-panel-${index}`}
              aria-labelledby={`${id}-tab-${index}`}
              hidden={selected !== item.value}
              className={styles.panel}
              tabIndex={0}
            >
              {item.content}
            </div>
          ),
      )}
    </div>
  );
}
