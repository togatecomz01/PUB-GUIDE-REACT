import SelectField from '../../../components/fields/SelectField/SelectField.tsx';
import TextField from '../../../components/fields/TextField/TextField.tsx';
import { serviceOptions } from './types.ts';
import type { ChangeField, RequestValues } from './types.ts';

export default function ServiceFields({
  values,
  onChange,
}: {
  values: RequestValues;
  onChange: ChangeField;
}) {
  return (
    <>
      <SelectField
        label="문의 유형"
        name="service"
        options={serviceOptions}
        value={values.service}
        onValueChange={(value) => onChange('service', value)}
      />
      <TextField
        label="요청사항 (선택)"
        name="note"
        placeholder="간단히 입력해 주세요"
        value={values.note}
        onValueChange={(value) => onChange('note', value)}
      />
    </>
  );
}
