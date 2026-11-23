import { useLayoutEffect, useRef, useState } from 'react';
import TabList from '../internal/TabList/TabList.tsx';
import type { TabProps } from '../internal/TabList/TabList.tsx';
import Icon from '../Icon/Icon.tsx';
import { cx } from '../../utils/cx.ts';
import styles from './SegmentedControl.module.scss';
export type SegmentedControlProps = TabProps & {
  alignment?: 'full' | 'fluid';
  fadeEdges?: boolean;
  showScrollButton?: boolean;
};
/* 탭 너비를 균등 분할하거나 문구 길이에 맞춰 표시 */
export default function SegmentedControl({
  alignment = 'full',
  fadeEdges = true,
  showScrollButton = false,
  className,
  ...props
}: SegmentedControlProps) {
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLElement | null>(null);
  const [edges, setEdges] = useState({ left: false, right: false });
  const isFluid = alignment === 'fluid';
  const isLeftFadeVisible = isFluid && fadeEdges && edges.left;
  const isRightFadeVisible = isFluid && fadeEdges && edges.right;
  const isScrollButtonVisible = isFluid && showScrollButton && edges.left;

  /* 앞쪽 메뉴 보기 버튼 클릭 시 목록을 왼쪽으로 이동 */
  function scrollBack() {
    list.current?.scrollBy({ left: -200, behavior: 'smooth' });
  }

  /* 목록 좌우에 가려진 메뉴가 있는지 확인 */
  function measure() {
    const el = list.current;
    if (!el) return;
    const next = {
      left: el.scrollLeft > 1,
      right: el.scrollWidth - el.clientWidth - el.scrollLeft > 1,
    };
    setEdges((old) => {
      const unchanged = old.left === next.left && old.right === next.right;
      return unchanged ? old : next;
    });
  }
  useLayoutEffect(() => {
    list.current = root.current?.querySelector('[role="tablist"]') ?? null;
    const el = list.current;
    if (!el) return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    Array.from(el.children).forEach((child) => observer.observe(child));
    measure();
    return () => observer.disconnect();
  }, [props.items, alignment]);
  return (
    <div ref={root} className={cx(styles.frame, className)} onScrollCapture={measure}>
      <TabList {...props} styles={styles} fixedItems={isFluid} />
      {isLeftFadeVisible && <span className={styles.fadeLeft} aria-hidden="true" />}
      {isRightFadeVisible && <span className={styles.fadeRight} aria-hidden="true" />}
      {isScrollButtonVisible && (
        <button
          className={styles.scrollBack}
          type="button"
          aria-label="앞쪽 메뉴 보기"
          onClick={scrollBack}
        >
          <Icon name="chevron_left" size={16} />
        </button>
      )}
    </div>
  );
}
