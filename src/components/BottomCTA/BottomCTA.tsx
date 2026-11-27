import type { CSSProperties } from 'react';
import ActionButtons from '../internal/ActionButtons/ActionButtons.tsx';
import type { ActionButtonsProps } from '../internal/ActionButtons/ActionButtons.tsx';
import { cx } from '../../utils/cx.ts';
import styles from './BottomCTA.module.scss';
export type BottomCTAProps = Omit<ActionButtonsProps, 'size'> & {
  as?: 'div' | 'footer';
  position?: 'static' | 'sticky' | 'fixed';
  bottom?: number;
};
/* 화면 하단에 주요·보조 버튼 배치 */
export default function BottomCTA({
  as: Container = 'div',
  position = 'static',
  bottom = 0,
  className,
  ...actions
}: BottomCTAProps) {
  return (
    <Container
      className={cx(styles['bottom-cta'], styles[position], className)}
      style={{ bottom } as CSSProperties}
    >
      <ActionButtons {...actions} className={styles.actions} />
    </Container>
  );
}
