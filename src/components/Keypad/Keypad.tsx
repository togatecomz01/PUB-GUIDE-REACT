import FormButton from '../FormButton/FormButton.tsx';
import Icon from '../Icon/Icon.tsx';
import { cx } from '../../utils/cx.ts';
import styles from './Keypad.module.scss';
export type AmountAction = { label: string; value: number; disabled?: boolean };
const defaultAmounts: AmountAction[] = [
  { label: '+10만', value: 100000 },
  { label: '+50만', value: 500000 },
  { label: '+100만', value: 1000000 },
  { label: '+1000만', value: 10000000 },
];
const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '0'];

export type KeypadProps = {
  onKey: (key: string) => void;
  onBackspace: () => void;
  onAmount?: (amount: number) => void;
  amountButtons?: false | AmountAction[];
  disabled?: boolean;
  className?: string;
};
export default function Keypad({
  onKey,
  onBackspace,
  onAmount,
  amountButtons = defaultAmounts,
  disabled,
  className,
}: KeypadProps) {
  const amounts = amountButtons === false ? [] : amountButtons;
  const isAmountVisible = amounts.length > 0;

  return (
    <div className={cx(styles.root, className)}>
      {isAmountVisible && (
        <div className={styles.amounts} role="group" aria-label="금액 추가">
          {amounts.map((item) => (
            <FormButton
              key={item.label}
              className={styles.amount}
              disabled={disabled || item.disabled || !onAmount}
              onClick={() => onAmount?.(item.value)}
            >
              {item.label}
            </FormButton>
          ))}
        </div>
      )}
      <div className={styles.keys} role="group" aria-label="숫자 키패드">
        {keys.map((key) => (
          <button key={key} type="button" disabled={disabled} onClick={() => onKey(key)}>
            {key}
          </button>
        ))}
        <button type="button" disabled={disabled} aria-label="한 자리 지우기" onClick={onBackspace}>
          <Icon name="arrow_left" size={24} />
        </button>
      </div>
    </div>
  );
}
