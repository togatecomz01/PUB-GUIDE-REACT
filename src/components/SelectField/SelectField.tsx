import { useId } from 'react';
import type { ComponentPropsWithRef } from 'react';
import FieldFrame, { getFieldIds } from '../internal/FieldFrame/FieldFrame.tsx';
import type { FieldName, FieldOptions } from '../internal/FieldFrame/FieldFrame.tsx';
import { useValue } from '../../hooks/useValue.ts';
import { cx } from '../../utils/cx.ts';
import Icon from '../Icon/Icon.tsx';
import field from '../TextField/TextField.module.scss';
import styles from './SelectField.module.scss';
export type SelectOption = { value: string; label: string; disabled?: boolean };
export type SelectFieldProps = FieldName &
  FieldOptions &
  Omit<
    ComponentPropsWithRef<'select'>,
    | 'size'
    | 'multiple'
    | 'children'
    | 'value'
    | 'defaultValue'
    | 'onChange'
    | 'className'
    | 'id'
    | 'disabled'
    | 'aria-label'
    | 'aria-labelledby'
    | 'aria-describedby'
  > & {
    options: SelectOption[];
    variant?: 'box' | 'line';
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
  };
/* 목록에서 항목 하나를 고르는 입력창 표시 */
export default function SelectField(props: SelectFieldProps) {
  const {
    options,
    variant = 'box',
    placeholder = '항목을 선택해 주세요',
    value,
    defaultValue = '',
    onValueChange,
    label,
    helperText,
    status = 'default',
    disabled,
    id,
    className,
    ...select
  } = props;
  const generatedId = useId();
  const ids = getFieldIds(id ?? `${generatedId}-input`, props);
  const [current, update] = useValue(value, defaultValue, onValueChange);
  const isLine = variant === 'line';
  const isEmpty = !current;

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
        className={cx(field.control, field[variant], styles.control, isLine && styles.line)}
        data-status={status}
        data-disabled={disabled || undefined}
      >
        <select
          {...select}
          id={ids.id}
          value={current}
          disabled={disabled}
          aria-label={select['aria-label']}
          aria-labelledby={ids.labelledBy}
          aria-describedby={ids.describedBy}
          aria-invalid={ids.invalid}
          className={styles.select}
          data-empty={isEmpty || undefined}
          onChange={(e) => update(e.target.value)}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        <Icon className={styles.arrow} name="chevron_down" size={24} />
      </div>
    </FieldFrame>
  );
}
