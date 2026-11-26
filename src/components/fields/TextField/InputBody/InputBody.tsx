import type { ChangeEvent } from 'react';
import FormButton from '../../../FormButton/FormButton.tsx';
import EmailInput from './EmailInput.tsx';
import RrnInput from './RrnInput.tsx';
import PhoneInput from './PhoneInput.tsx';
import { digits } from './inputParts.ts';
import type { InputPartProps } from './inputParts.ts';
import type { InputKind } from '../TextField.tsx';
import styles from '../TextField.module.scss';

type InputBodyProps = InputPartProps & {
  kind: InputKind;
  emailDomains: string[];
  phonePrefixes: string[];
  unit: string;
  remainingTime?: string;
  actionLabel?: string;
  onAction?: () => void;
};
/* 입력 종류에 맞춰 입력칸과 보조 버튼 배치 */
export default function InputBody({
  ids,
  kind,
  value,
  onValueChange,
  inputProps,
  emailDomains,
  phonePrefixes,
  unit,
  remainingTime,
  actionLabel,
  onAction,
}: InputBodyProps) {
  const isActionDisabled = inputProps.disabled || inputProps.readOnly;
  const common = {
    ...inputProps,
    id: ids.id,
    'aria-label': ids.accessibleName,
    'aria-labelledby': ids.labelledBy,
    'aria-describedby': ids.describedBy,
    'aria-invalid': ids.invalid,
    className: styles.input,
  };

  // 나뉜 입력에도 첫 입력칸의 속성과 연결 정보를 함께 전달합니다.
  const part = { ids, inputProps: common, value, onValueChange };

  if (kind === 'email') {
    return <EmailInput {...part} emailDomains={emailDomains} />;
  }

  if (kind === 'rrn') {
    return <RrnInput {...part} />;
  }

  if (kind === 'phone') {
    return (
      <PhoneInput
        {...part}
        phonePrefixes={phonePrefixes}
        actionLabel={actionLabel}
        onAction={onAction}
      />
    );
  }

  const isPrice = kind === 'price';
  const isCode = kind === 'code';
  const type = kind === 'basic' ? (inputProps.type ?? 'text') : 'text';
  const maxLength = isCode ? 6 : inputProps.maxLength;
  let inputMode = inputProps.inputMode;
  let defaultPlaceholder = '텍스트를 입력해 주세요';
  if (isPrice) {
    inputMode = 'decimal';
    defaultPlaceholder = '0';
  } else if (isCode) {
    inputMode = 'numeric';
    defaultPlaceholder = '인증번호 6자리';
  }
  const placeholder = inputProps.placeholder ?? defaultPlaceholder;

  /* 입력값 변경 전달 (인증번호는 숫자 6자리까지) */
  function changeValue(event: ChangeEvent<HTMLInputElement>) {
    const next = event.target.value;
    onValueChange(isCode ? digits(next).slice(0, 6) : next);
  }

  return (
    <>
      <input
        {...common}
        type={type}
        inputMode={inputMode}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        data-align={isPrice ? 'right' : undefined}
        onChange={changeValue}
      />
      {isPrice && <span className={styles.unit}>{unit}</span>}
      {isCode && (
        <span className={styles.codeActions}>
          {remainingTime && (
            <span className={styles.timer} aria-label={`남은 시간 ${remainingTime}`}>
              {remainingTime}
            </span>
          )}
          <FormButton className={styles.action} disabled={isActionDisabled} onClick={onAction}>
            {actionLabel ?? '시간연장'}
          </FormButton>
        </span>
      )}
    </>
  );
}
