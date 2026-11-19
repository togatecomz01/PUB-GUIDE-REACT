import type { ComponentPropsWithRef } from 'react';
import { cx } from '../../utils/cx.ts';
import styles from './FormButton.module.scss';
export type FormButtonProps = ComponentPropsWithRef<'button'> & {
  previewState?: 'pressed';
};
export default function FormButton({
  type = 'button',
  className,
  previewState,
  ...props
}: FormButtonProps) {
  return (
    <button
      {...props}
      data-preview-state={previewState}
      type={type}
      className={cx(styles.button, className)}
    />
  );
}
