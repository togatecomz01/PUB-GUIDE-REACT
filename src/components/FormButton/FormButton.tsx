import type { ComponentPropsWithRef } from 'react';
import { cx } from '../../utils/cx.ts';
import styles from './FormButton.module.scss';
export type FormButtonProps = ComponentPropsWithRef<'button'>;
/* 입력창이나 키패드에 쓰는 보조 버튼 표시 */
export default function FormButton({ type = 'button', className, ...props }: FormButtonProps) {
  return <button {...props} type={type} className={cx(styles.button, className)} />;
}
