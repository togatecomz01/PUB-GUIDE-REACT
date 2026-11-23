import { useId } from 'react';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import FieldFrame, { getFieldIds } from '../internal/FieldFrame/FieldFrame.tsx';
import type { FieldName, FieldOptions } from '../internal/FieldFrame/FieldFrame.tsx';
import Icon from '../Icon/Icon.tsx';
import { cx } from '../../utils/cx.ts';
import { useValue } from '../../hooks/useValue.ts';
import InputBody from '../internal/InputBody/InputBody.tsx';
import clearIcon from '../../assets/icons/fields/ico_input_clear_focus.svg';
import styles from './TextField.module.scss';

export type InputKind = 'basic' | 'price' | 'email' | 'rrn' | 'phone' | 'code';
export type TextFieldProps = FieldName &
  FieldOptions &
  Omit<
    ComponentPropsWithRef<'input'>,
    | 'size'
    | 'value'
    | 'defaultValue'
    | 'onChange'
    | 'children'
    | 'className'
    | 'id'
    | 'disabled'
    | 'aria-label'
    | 'aria-labelledby'
    | 'aria-describedby'
  > & {
    /* 입력 내부 오른쪽의 보조 UI. 별도 버튼의 disabled 상태는 호출 화면에서 전달합니다. */
    endAdornment?: ReactNode;
    kind?: InputKind;
    variant?: 'box' | 'line';
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    emailDomains?: string[];
    phonePrefixes?: string[];
    unit?: string;
    remainingTime?: string;
    actionLabel?: string;
    onAction?: () => void;
    /* 가이드에서 포커스 모양을 비교할 때만 사용합니다. */
    previewState?: 'focus';
  };

/* 입력 종류에 맞춰 입력칸과 보조 요소 구성 */
export default function TextField(props: TextFieldProps) {
  const {
    endAdornment,
    kind = 'basic',
    variant = 'box',
    value,
    defaultValue = '',
    onValueChange,
    label,
    helperText,
    status = 'default',
    disabled,
    className,
    id,
    emailDomains = ['naver.com'],
    phonePrefixes = ['010'],
    unit = '원',
    remainingTime,
    actionLabel,
    onAction,
    previewState,
    ...input
  } = props;
  const generatedId = useId();
  const ids = getFieldIds(id ?? `${generatedId}-input`, props);
  const [current, update] = useValue(value, defaultValue, onValueChange);

  const isComposite = ['email', 'rrn', 'phone'].includes(kind);
  const isFilled = Boolean(current);
  const isClearVisible =
    (kind === 'basic' || kind === 'code') &&
    isFilled &&
    !disabled &&
    !input.readOnly &&
    status !== 'success';
  const isSuccessVisible = status === 'success' && variant === 'box';
  const inputProps = {
    ...input,
    name: isComposite ? undefined : input.name,
    disabled,
  };

  /* X 버튼 클릭 시 입력값 비우기 */
  function clearValue() {
    update('');
    document.getElementById(ids.id)?.focus();
  }

  return (
    <FieldFrame
      id={ids.id}
      label={label}
      helperText={helperText}
      status={status}
      disabled={disabled}
      className={className}
    >
      <div
        className={cx(styles.control, styles[variant])}
        data-status={status}
        data-disabled={disabled || undefined}
        data-readonly={input.readOnly || undefined}
        data-filled={isFilled || undefined}
        data-preview-state={previewState}
      >
        {isComposite && input.name && (
          <input type="hidden" name={input.name} value={current} disabled={disabled} />
        )}
        <InputBody
          ids={ids}
          kind={kind}
          value={current}
          onValueChange={update}
          inputProps={inputProps}
          emailDomains={emailDomains}
          phonePrefixes={phonePrefixes}
          unit={unit}
          remainingTime={remainingTime}
          actionLabel={actionLabel}
          onAction={onAction}
        />
        {isClearVisible && (
          <button
            type="button"
            className={styles.clear}
            aria-label={`${ids.accessibleName} 지우기`}
            onMouseDown={(event) => event.preventDefault()}
            onClick={clearValue}
          >
            <img src={clearIcon} alt="" />
          </button>
        )}
        {isSuccessVisible && (
          <Icon className={styles.success} name="check" size={24} label="확인 완료" />
        )}
        {endAdornment}
      </div>
    </FieldFrame>
  );
}
