import Button from '../../Button/Button.tsx';
import type { ButtonProps } from '../../Button/Button.tsx';
import { cx } from '../../../utils/cx.ts';
import styles from './ActionButtons.module.scss';
export type Action = Omit<ButtonProps, 'variant' | 'size' | 'children'> & {
  label: string;
};
export type ActionButtonsProps = {
  primary: Action;
  secondary?: Action;
  weakVariant?: 'secondary' | 'tertiary';
  layout?: 'horizontal' | 'vertical';
  size?: 'l' | 'm';
  className?: string;
};
/* 하단 주요·보조 버튼을 가로 또는 세로로 배치 */
export default function ActionButtons({
  primary,
  secondary,
  weakVariant = 'secondary',
  layout = 'horizontal',
  size = 'l',
  className,
}: ActionButtonsProps) {
  /* 주요·보조 구분에 맞는 버튼 종류 적용 */
  function render(action: Action, weak = false) {
    const { label, className: buttonClass, ...props } = action;
    return (
      <Button
        {...props}
        size={size}
        variant={weak ? weakVariant : 'primary'}
        className={cx(styles.button, buttonClass)}
      >
        {label}
      </Button>
    );
  }
  return (
    <div className={cx(styles.actions, layout === 'vertical' && styles.vertical, className)}>
      {layout === 'vertical' ? (
        <>
          {render(primary)}
          {secondary && render(secondary, true)}
        </>
      ) : (
        <>
          {secondary && render(secondary, true)}
          {render(primary)}
        </>
      )}
    </div>
  );
}
