import { useEffect, useRef } from 'react';
import type { ChangeEvent } from 'react';
import { digits } from './inputParts.ts';
import type { InputPartProps } from './inputParts.ts';
import styles from '../TextField.module.scss';

/* 주민번호 입력을 나누고 뒷자리 마스킹·포커스 이동 처리 */
export default function RrnInput({ ids, inputProps, value, onValueChange }: InputPartProps) {
  const secretRef = useRef<HTMLInputElement>(null);
  const focusSecret = useRef(false);
  useEffect(() => {
    if (focusSecret.current && value.split('-')[1]) {
      focusSecret.current = false;
      secretRef.current?.focus();
    }
  }, [value]);

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
        {...inputProps}
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
