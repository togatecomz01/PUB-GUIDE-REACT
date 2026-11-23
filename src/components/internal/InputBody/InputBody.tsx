import { useEffect, useId, useRef } from 'react';
import type { ComponentPropsWithRef, ChangeEvent } from 'react';
import FormButton from '../../FormButton/FormButton.tsx';
import Icon from '../../Icon/Icon.tsx';
import type { FieldIds } from '../FieldFrame/FieldFrame.tsx';
import type { InputKind } from '../../TextField/TextField.tsx';
import styles from '../../TextField/TextField.module.scss';

type InputBodyProps = {
  ids: FieldIds;
  kind: InputKind;
  value: string;
  onValueChange: (value: string) => void;
  inputProps: ComponentPropsWithRef<'input'>;
  emailDomains: string[];
  phonePrefixes: string[];
  unit: string;
  remainingTime?: string;
  actionLabel?: string;
  onAction?: () => void;
};
/* 입력값에서 숫자만 남기기 */
const digits = (value: string) => value.replace(/\D/g, '');

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
  const listId = useId();
  const secretRef = useRef<HTMLInputElement>(null);
  const focusSecret = useRef(false);
  useEffect(() => {
    if (kind === 'rrn' && focusSecret.current && value.split('-')[1]) {
      focusSecret.current = false;
      secretRef.current?.focus();
    }
  }, [kind, value]);
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

  if (kind === 'email') {
    const [user = '', domain = ''] = value.split('@');
    /* 아이디와 도메인을 합쳐 이메일 값 전달 */
    function updateEmail(userPart: string, domainPart: string) {
      onValueChange(userPart || domainPart ? `${userPart}@${domainPart}` : '');
    }
    /* 아이디 입력 변경 시 현재 도메인과 합쳐 전달 */
    function changeUser(event: ChangeEvent<HTMLInputElement>) {
      updateEmail(event.target.value, domain);
    }
    /* 도메인 변경 시 현재 아이디와 합쳐 전달 */
    function changeDomain(event: ChangeEvent<HTMLInputElement>) {
      updateEmail(user, event.target.value);
    }

    return (
      <>
        <input
          {...common}
          className={styles.emailUser}
          type="text"
          size={Math.max(user.length, 6)}
          placeholder={inputProps.placeholder ?? '아이디'}
          value={user}
          onChange={changeUser}
        />
        <span className={styles.separator} aria-hidden="true">
          @
        </span>
        <span className={styles.domain}>
          <input
            className={styles.input}
            id={`${ids.id}-domain`}
            aria-label={`${ids.accessibleName} 도메인`}
            aria-describedby={ids.describedBy}
            aria-invalid={ids.invalid}
            type="text"
            list={listId}
            placeholder="선택"
            value={domain}
            disabled={inputProps.disabled}
            readOnly={inputProps.readOnly}
            required={inputProps.required}
            onChange={changeDomain}
          />
          <Icon className={styles.arrow} name="chevron_down" size={24} />
          <datalist id={listId}>
            {emailDomains.map((item) => (
              <option key={item} value={item} />
            ))}
          </datalist>
        </span>
      </>
    );
  }

  if (kind === 'rrn') {
    const [front = '', back = ''] = value.split('-');
    /* 앞자리와 뒷자리를 합쳐 입력값 전달 */
    function updateRrn(frontPart: string, backPart: string) {
      onValueChange(frontPart || backPart ? `${frontPart}-${backPart}` : '');
    }
    /* 앞자리 입력 시 숫자 6자리까지 반영 */
    function changeFront(event: ChangeEvent<HTMLInputElement>) {
      updateRrn(digits(event.target.value).slice(0, 6), back);
    }
    /* 뒷자리 첫 칸 입력 처리 및 다음 칸 이동 준비 */
    function changeFirstDigit(event: ChangeEvent<HTMLInputElement>) {
      const next = digits(event.target.value).slice(0, 7);
      focusSecret.current = Boolean(next);
      const nextBack = next.length === 1 ? next + back.slice(1) : next;
      updateRrn(front, nextBack);
    }
    /* 가려진 뒷자리 입력 시 첫 숫자를 유지하고 나머지 변경 */
    function changeSecret(event: ChangeEvent<HTMLInputElement>) {
      const nextBack = back.slice(0, 1) + digits(event.target.value).slice(0, 6);
      updateRrn(front, nextBack);
    }

    return (
      <>
        <input
          {...common}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          placeholder="앞 6자리"
          maxLength={6}
          value={front}
          onChange={changeFront}
        />
        <span className={styles.separator} aria-hidden="true">
          –
        </span>
        <span className={styles.rrnBack}>
          {!back && (
            <span className={styles.backPlaceholder} aria-hidden="true">
              뒤 7자리
            </span>
          )}
          <input
            className={styles.firstDigit}
            id={`${ids.id}-first`}
            aria-label={`${ids.accessibleName} 뒷자리 첫 숫자`}
            aria-describedby={ids.describedBy}
            aria-invalid={ids.invalid}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            maxLength={7}
            value={back.slice(0, 1)}
            disabled={inputProps.disabled}
            readOnly={inputProps.readOnly}
            required={inputProps.required}
            onChange={changeFirstDigit}
          />
          <input
            ref={secretRef}
            className={styles.secret}
            id={`${ids.id}-secret`}
            aria-label={`${ids.accessibleName} 뒷자리 나머지 6자리`}
            aria-describedby={ids.describedBy}
            aria-invalid={ids.invalid}
            type="password"
            inputMode="numeric"
            autoComplete="off"
            maxLength={6}
            value={back.slice(1)}
            disabled={inputProps.disabled || !back}
            readOnly={inputProps.readOnly}
            required={inputProps.required}
            onChange={changeSecret}
          />
        </span>
      </>
    );
  }

  if (kind === 'phone') {
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
          {...common}
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
