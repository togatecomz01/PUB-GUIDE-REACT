import { useId } from 'react';
import type { ReactNode, SyntheticEvent, MouseEvent } from 'react';
import { useDialog } from '../../hooks/useDialog.ts';
import ActionButtons from '../internal/ActionButtons/ActionButtons.tsx';
import type { ActionButtonsProps } from '../internal/ActionButtons/ActionButtons.tsx';
import Icon from '../Icon/Icon.tsx';
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

  function cancelSheet(event: SyntheticEvent<HTMLDialogElement>) {
    event.preventDefault();
    onClose();
  }

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
export type SheetOption = {
  value: string;
  label: string;
  description?: string;
  image?: string;
  disabled?: boolean;
};
export function SheetOptions({
  items,
  value,
  onValueChange,
  kind = 'account',
  'aria-label': label,
}: {
  items: SheetOption[];
  value?: string;
  onValueChange: (value: string) => void;
  kind?: 'account' | 'bank';
  'aria-label': string;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cx(styles.options, kind === 'bank' && styles.bankGrid)}
    >
      {items.map((item) => {
        const isSelected = value === item.value;
        const isCheckVisible = kind === 'account' && (isSelected || item.disabled);
        return (
          <button
            key={item.value}
            type="button"
            className={styles.option}
            data-kind={kind}
            aria-pressed={isSelected}
            disabled={item.disabled}
            onClick={() => onValueChange(item.value)}
          >
            {item.image && <img className={styles.logo} src={item.image} alt="" />}
            <span className={styles.optionText}>
              <span>{item.label}</span>
              {item.description && <small>{item.description}</small>}
            </span>
            {isCheckVisible && <Icon name="check" size={24} />}
          </button>
        );
      })}
    </div>
  );
}
