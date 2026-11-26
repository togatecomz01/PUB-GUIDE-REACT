import type { ChangeEvent } from 'react';
import FormButton from '../../../FormButton/FormButton.tsx';
import Icon from '../../../Icon/Icon.tsx';
import { digits } from './inputParts.ts';
import type { InputPartProps } from './inputParts.ts';
import styles from '../TextField.module.scss';

type PhoneInputProps = InputPartProps & {
  phonePrefixes: string[];
  actionLabel?: string;
  onAction?: () => void;
};

/* 휴대폰 앞자리와 나머지 번호를 조합해 전달 */
export default function PhoneInput({
  ids,
  inputProps,
  value,
  onValueChange,
  phonePrefixes,
  actionLabel,
  onAction,
}: PhoneInputProps) {
  const isActionDisabled = inputProps.disabled || inputProps.readOnly;
  const [savedPrefix, number = ''] = value.split('-');
  const prefix = savedPrefix || phonePrefixes[0] || '010';
  const prefixes = [...new Set([...phonePrefixes, prefix])];

  /* 휴대폰 앞자리 선택 시 현재 뒷번호와 합쳐 전달 */
  function changePrefix(event: ChangeEvent<HTMLSelectElement>) {
    onValueChange(event.target.value + '-' + number);
  }
  /* 휴대폰 뒷번호 입력 시 숫자 8자리까지 반영 */
  function changeNumber(event: ChangeEvent<HTMLInputElement>) {
    const nextNumber = digits(event.target.value).slice(0, 8);
    onValueChange(prefix + '-' + nextNumber);
  }

  return (
    <>
      <span className={styles.prefix}>
        <select
          aria-label={`${ids.accessibleName} 앞자리`}
          value={prefix}
          disabled={isActionDisabled}
          onChange={changePrefix}
        >
          {prefixes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <Icon className={styles.arrow} name="chevron_down" size={24} />
      </span>
      <input
        {...inputProps}
        type="tel"
        inputMode="numeric"
        placeholder={inputProps.placeholder ?? "'-' 없이 입력"}
        maxLength={8}
        value={number}
        onChange={changeNumber}
      />
      <FormButton className={styles.action} disabled={isActionDisabled} onClick={onAction}>
        {actionLabel ?? '요청'}
      </FormButton>
    </>
  );
}
