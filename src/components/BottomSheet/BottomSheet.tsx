import { useId } from 'react';
import type { ReactNode, SyntheticEvent, MouseEvent } from 'react';
import { useDialog } from '../../hooks/useDialog.ts';
import ActionButtons from '../internal/ActionButtons/ActionButtons.tsx';
import type { ActionButtonsProps } from '../internal/ActionButtons/ActionButtons.tsx';
import { cx } from '../../utils/cx.ts';
import styles from './BottomSheet.module.scss';
export type BottomSheetProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
  actions?: ActionButtonsProps;
  dim?: boolean;
  closeOnBackdrop?: boolean;
  className?: string;
};
/* 바텀시트의 제목·본문·버튼 영역 조합 */
export function SheetCard({
  title,
  description,
  children,
  actions,
  className,
  titleId,
  descriptionId,
}: {
  title: string;
  description?: ReactNode;
  children?: ReactNode;
  actions?: ActionButtonsProps;
  className?: string;
  titleId?: string;
  descriptionId?: string;
}) {
  return (
    <section className={cx(styles.card, className)}>
      <span className={styles.handle} aria-hidden="true" />
      <h2 id={titleId} className={styles.title}>
        {title}
      </h2>
      {description != null && (
        <p id={descriptionId} className={styles.description}>
          {description}
        </p>
      )}
      {children != null && <div className={styles.body}>{children}</div>}
      {actions && <ActionButtons {...actions} className={styles.actions} />}
    </section>
  );
}
/* 열림 상태에 맞춰 화면 아래에 바텀시트 표시 */
export default function BottomSheet({
  open,
  onClose,
  title,
  description,
  children,
  actions,
  dim = true,
  closeOnBackdrop = false,
  className,
}: BottomSheetProps) {
  const ref = useDialog(open);
  const id = useId();
  const titleId = id + '-title';
  const descriptionId = id + '-description';

  /* Esc 입력 시 바텀시트 닫기 요청 */
  function cancelSheet(event: SyntheticEvent<HTMLDialogElement>) {
    event.preventDefault();
    onClose();
  }

  /* 배경 클릭 시 바텀시트 닫기 (closeOnBackdrop이 켜진 경우) */
  function clickBackdrop(event: MouseEvent<HTMLDialogElement>) {
    const isBackdrop = event.target === event.currentTarget;
    if (closeOnBackdrop && isBackdrop) {
      onClose();
    }
  }

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      data-dim={dim}
      aria-labelledby={titleId}
      aria-describedby={typeof description === 'string' ? descriptionId : undefined}
      onCancel={cancelSheet}
      onClick={clickBackdrop}
    >
      <SheetCard
        title={title}
        description={description}
        titleId={titleId}
        descriptionId={descriptionId}
        actions={actions}
        className={className}
      >
        {children}
      </SheetCard>
    </dialog>
  );
}

export { SheetOptions } from './SheetOptions.tsx';
export type { SheetOption, BankColumns } from './SheetOptions.tsx';
