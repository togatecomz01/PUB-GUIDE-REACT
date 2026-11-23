import { cx } from '../../utils/cx.ts';
import { useId } from 'react';
import { useDialog } from '../../hooks/useDialog.ts';
import TextButton from '../TextButton/TextButton.tsx';
import type { KeyboardEvent, ReactNode, SyntheticEvent } from 'react';
import Button from '../Button/Button.tsx';
import styles from './Modal.module.scss';

export type DialogKind = 'alert' | 'confirm';
export type DialogActionLayout = 'horizontal' | 'vertical';

type DialogActionsProps = {
  /* 버튼 영역의 외부 레이아웃만 조정할 때 전달합니다. */
  className?: string;
  kind?: DialogKind;
  layout?: DialogActionLayout;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

/* 모달 종류와 배치 방향에 맞춰 확인·취소 버튼 표시 */
export function DialogActions({
  className = '',
  kind = 'alert',
  layout = 'horizontal',
  confirmLabel = '확인',
  cancelLabel = '취소',
  onConfirm,
  onCancel,
}: DialogActionsProps) {
  const isAlert = kind === 'alert';
  const isVertical = layout === 'vertical';
  const confirmButton = (
    <Button className={styles.actionButton} size="m" onClick={onConfirm}>
      {confirmLabel}
    </Button>
  );
  const cancelButton = (
    <Button className={styles.actionButton} size="m" variant="tertiary" onClick={onCancel}>
      {cancelLabel}
    </Button>
  );

  let buttons;
  if (isAlert) {
    buttons = (
      <TextButton className={styles.textButton} onClick={onConfirm}>
        {confirmLabel}
      </TextButton>
    );
  } else if (isVertical) {
    buttons = (
      <>
        {confirmButton}
        {cancelButton}
      </>
    );
  } else {
    buttons = (
      <>
        {cancelButton}
        {confirmButton}
      </>
    );
  }

  return (
    <footer className={cx(styles.actions, styles[kind], isVertical && styles.vertical, className)}>
      {buttons}
    </footer>
  );
}

export type DialogCardProps = Omit<DialogActionsProps, 'className'> & {
  title: string;
  description?: ReactNode;
  titleId?: string;
  descriptionId?: string;
};

/* 모달의 제목·안내문구·버튼 영역 조합 */
export function DialogCard({
  title,
  description,
  titleId,
  descriptionId,
  kind = 'alert',
  ...actions
}: DialogCardProps) {
  return (
    <section className={cx(styles.card, kind === 'confirm' && styles.confirmCard)}>
      <header className={styles.text}>
        <h3 className={styles.title} id={titleId}>
          {title}
        </h3>
        {description != null && (
          <p className={styles.description} id={descriptionId}>
            {description}
          </p>
        )}
      </header>
      <DialogActions {...actions} kind={kind} />
    </section>
  );
}

export type ModalProps = Omit<DialogCardProps, 'titleId' | 'descriptionId' | 'onCancel'> & {
  open: boolean;
  onClose: () => void;
};

/* 열림 상태에 맞춰 안내·확인 창 표시 */
export default function Modal({ open, onClose, onConfirm, description, ...card }: ModalProps) {
  const modalRef = useDialog(open);
  const id = useId();
  const titleId = `${id}-title`;
  const descriptionId = `${id}-description`;

  /* Esc 입력 시 모달 닫기 요청 */
  function cancelModal(event: SyntheticEvent<HTMLDialogElement>) {
    event.preventDefault();
    onClose();
  }

  /* Tab 입력 시 모달 안에서 키보드 포커스 순환 */
  function keepFocusInside(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== 'Tab') return;
    const controls = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        'button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter(
      (element) =>
        element.tabIndex >= 0 && element.getClientRects().length > 0 && !element.closest('[inert]'),
    );
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (!first || !last) {
      event.preventDefault();
      return;
    }
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <dialog
      ref={modalRef}
      className={styles.modal}
      onKeyDown={keepFocusInside}
      aria-labelledby={titleId}
      aria-describedby={typeof description === 'string' ? descriptionId : undefined}
      onCancel={cancelModal}
    >
      <DialogCard
        {...card}
        description={description}
        titleId={titleId}
        descriptionId={descriptionId}
        onCancel={onClose}
        onConfirm={onConfirm ?? onClose}
      />
    </dialog>
  );
}
