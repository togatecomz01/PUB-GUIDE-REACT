import selectedCheck from '../../assets/icons/selection/ico_account_selected.svg';
import inactiveCheck from '../../assets/icons/selection/ico_account_inactive.svg';
import { cx } from '../../utils/cx.ts';
import styles from './SheetOptions.module.scss';

export type SheetOption = {
  value: string;
  label: string;
  description?: string;
  image?: string;
  disabled?: boolean;
};
export type BankColumns = 1 | 2 | 3;

/* 계좌 목록 또는 은행 그리드 표시 */
export function SheetOptions({
  items,
  value,
  onValueChange,
  kind = 'account',
  columns = 3,
  'aria-label': label,
}: {
  items: SheetOption[];
  value?: string;
  onValueChange: (value: string) => void;
  kind?: 'account' | 'bank';
  columns?: BankColumns;
  'aria-label': string;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cx(styles.options, kind === 'bank' && styles['bank-grid'])}
      data-columns={kind === 'bank' ? columns : undefined}
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
            <span className={styles['option-text']}>
              <span>{item.label}</span>
              {item.description && <small>{item.description}</small>}
            </span>
            {isCheckVisible && (
              <img
                className={styles.check}
                src={item.disabled ? inactiveCheck : selectedCheck}
                alt=""
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
