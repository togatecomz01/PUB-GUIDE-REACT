import { useId } from 'react';
import type { ComponentPropsWithRef, KeyboardEvent } from 'react';
import FieldFrame, { getFieldIds } from '../internal/FieldFrame/FieldFrame.tsx';
import type { FieldName, FieldOptions } from '../internal/FieldFrame/FieldFrame.tsx';
import Icon from '../Icon/Icon.tsx';
import clearIcon from '../../assets/icons/fields/ico_input_clear_focus.svg';
import { useValue } from '../../hooks/useValue.ts';
import styles from './SearchField.module.scss';

export type SearchFieldProps = FieldName &
  FieldOptions &
  Omit<
    ComponentPropsWithRef<'input'>,
    | 'type'
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
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    onSearch?: (value: string) => void;
    searchButton?: boolean;
    previewState?: 'focus';
  };

export default function SearchField(props: SearchFieldProps) {
  const {
    value,
    defaultValue = '',
    onValueChange,
    onSearch,
    searchButton = false,
    label,
    helperText,
    status = 'default',
    disabled,
    className,
    id,
    previewState,
    onKeyDown,
    ...input
  } = props;
  const generatedId = useId();
  const ids = getFieldIds(id ?? `${generatedId}-input`, props);
  const [current, update] = useValue(value, defaultValue, onValueChange);

  const isClearVisible = Boolean(current) && !disabled && !input.readOnly;

  function clearValue() {
    update('');
    document.getElementById(ids.id)?.focus();
  }

  function searchValue() {
    onSearch?.(current);
  }

  function search(event: KeyboardEvent<HTMLInputElement>) {
    onKeyDown?.(event);
    if (event.defaultPrevented || event.nativeEvent.isComposing) {
      return;
    }
    if (event.key !== 'Enter' || !onSearch) {
      return;
    }
    event.preventDefault();
    onSearch(current);
  }
  const icon = <Icon name="search" size={20} />;
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
        className={styles.control}
        data-status={status}
        data-disabled={disabled || undefined}
        data-preview-state={previewState}
      >
        {!searchButton && icon}
        <input
          {...input}
          id={ids.id}
          className={styles.input}
          type="search"
          aria-label={input['aria-label']}
          aria-labelledby={ids.labelledBy}
          aria-describedby={ids.describedBy}
          aria-invalid={ids.invalid}
          disabled={disabled}
          placeholder={input.placeholder ?? '검색어를 입력해 주세요'}
          value={current}
          onChange={(event) => update(event.target.value)}
          onKeyDown={search}
        />
        {isClearVisible && (
          <button
            className={styles.clear}
            type="button"
            aria-label={`${ids.accessibleName} 지우기`}
            onMouseDown={(event) => event.preventDefault()}
            onClick={clearValue}
          >
            <img src={clearIcon} alt="" />
          </button>
        )}
        {searchButton && (
          <button
            className={styles.searchButton}
            type="button"
            aria-label={`${ids.accessibleName} 검색`}
            disabled={disabled}
            onClick={searchValue}
          >
            {icon}
          </button>
        )}
      </div>
    </FieldFrame>
  );
}
