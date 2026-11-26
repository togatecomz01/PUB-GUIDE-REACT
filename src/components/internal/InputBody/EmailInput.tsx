import { useId } from 'react';
import type { ChangeEvent } from 'react';
import Icon from '../../Icon/Icon.tsx';
import type { InputPartProps } from './inputParts.ts';
import styles from '../../TextField/TextField.module.scss';

type EmailInputProps = InputPartProps & { emailDomains: string[] };

/* 아이디와 도메인을 입력하고 이메일 값으로 전달 */
export default function EmailInput({
  ids,
  inputProps,
  value,
  onValueChange,
  emailDomains,
}: EmailInputProps) {
  const listId = useId();
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
        {...inputProps}
        className={styles.emailUser}
        type="text"
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
