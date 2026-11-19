import { useLayoutEffect, useRef, useState } from 'react';
import type { MouseEvent, PointerEvent } from 'react';

type Gesture = {
  pointerId: number;
  startX: number;
  startY: number;
  startScroll: number;
  dragging: boolean;
};

export function useHorizontalDrag(content: readonly unknown[]) {
  const listRef = useRef<HTMLDivElement>(null);
  const gesture = useRef<Gesture | null>(null);
  const suppressClick = useRef(false);
  const [scrollable, setScrollable] = useState(false);
  const [dragging, setDragging] = useState(false);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const measure = () => {
      // 1px 이내의 반올림 차이는 드래그할 콘텐츠로 보지 않습니다.
      const canScroll = list.scrollWidth > list.clientWidth + 1;
      setScrollable(canScroll);
      if (!canScroll && gesture.current) {
        const { pointerId } = gesture.current;
        gesture.current = null;
        setDragging(false);
        if (list.hasPointerCapture(pointerId)) list.releasePointerCapture(pointerId);
      }
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    // 글꼴 로드·문구·선택 굵기에 따른 메뉴 너비 변화도 확인합니다.
    for (const item of list.children) observer.observe(item);
    return () => observer.disconnect();
  }, [content]);

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    suppressClick.current = false;
    if (event.pointerType !== 'mouse' || event.button !== 0 || !event.isPrimary) return;
    const list = event.currentTarget;
    if (list.scrollWidth <= list.clientWidth + 1) return;
    gesture.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startScroll: list.scrollLeft,
      dragging: false,
    };
  }

  function finish(event: PointerEvent<HTMLDivElement>) {
    if (gesture.current?.pointerId !== event.pointerId) return;
    gesture.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const current = gesture.current;
    if (!current || current.pointerId !== event.pointerId) return;
    if (!(event.buttons & 1)) {
      finish(event);
      return;
    }
    const dx = event.clientX - current.startX;
    const dy = event.clientY - current.startY;
    if (!current.dragging) {
      if (Math.abs(dx) < 6) return;
      if (Math.abs(dy) > Math.abs(dx)) {
        gesture.current = null;
        return;
      }
      current.dragging = true;
      suppressClick.current = true;
      setDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    event.preventDefault();
    event.currentTarget.scrollLeft = current.startScroll - dx;
  }

  function onClickCapture(event: MouseEvent<HTMLDivElement>) {
    const shouldSuppress = suppressClick.current && event.detail !== 0;
    suppressClick.current = false;
    if (shouldSuppress) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  return {
    ref: listRef,
    'data-scrollable': scrollable || undefined,
    'data-dragging': dragging || undefined,
    onPointerDown,
    onPointerMove,
    onPointerUp: finish,
    onPointerCancel: finish,
    onLostPointerCapture: finish,
    onClickCapture,
  };
}
