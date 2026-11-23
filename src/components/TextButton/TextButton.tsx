import type { ComponentPropsWithRef, ReactNode } from 'react';
import Icon from '../Icon/Icon.tsx';
import { cx } from '../../utils/cx.ts';
import styles from './TextButton.module.scss';
export type TextButtonProps = ComponentPropsWithRef<'button'> & {
  appearance?: 'arrow' | 'clear' | 'underline';
  tone?: 'brand' | 'neutral';
  size?: 'l' | 'm' | 's';
  icon?: ReactNode;
  iconPosition?: 'start' | 'end';
  previewState?: 'pressed';
};
/* 밑줄이나 아이콘을 조합하는 텍스트 버튼 표시 */
export default function TextButton({
  appearance = 'clear',
  tone = 'brand',
  size = 'm',
  icon,
  iconPosition = 'end',
  previewState,
  type = 'button',
  className,
  children,
  ...props
}: TextButtonProps) {
  const iconSize = { l: 24, m: 20, s: 16 } as const;
  const isUnderlined = appearance === 'underline';
  let graphic = icon;
  if (graphic == null && appearance === 'arrow') {
    graphic = <Icon name="chevron_right" size={iconSize[size]} />;
  }

  return (
    <button
      {...props}
      data-preview-state={previewState}
      type={type}
      className={cx(
        styles.button,
        styles[tone],
        styles[size],
        isUnderlined && styles.underline,
        className,
      )}
    >
      {iconPosition === 'start' && graphic}
      <span>{children}</span>
      {iconPosition === 'end' && graphic}
    </button>
  );
}
