import type { CSSProperties } from 'react';
import ActionButtons from '../internal/ActionButtons/ActionButtons.tsx';
import type { ActionButtonsProps } from '../internal/ActionButtons/ActionButtons.tsx';
import { cx } from '../../utils/cx.ts';
import styles from './BottomCTA.module.scss';
export type BottomCTAProps = Omit<ActionButtonsProps, 'size'> & {
  position?: 'static' | 'sticky' | 'fixed';
  bottom?: number;
};
export default function BottomCTA({
  position = 'static',
  bottom = 0,
  className,
  ...actions
}: BottomCTAProps) {
  return (
    <footer
      className={cx(styles.root, styles[position], className)}
      style={{ bottom } as CSSProperties}
    >
      <ActionButtons {...actions} className={styles.actions} />
    </footer>
  );
}
