import { useState } from 'react';
import SelectField from '../../../../components/SelectField/SelectField.tsx';
const options = [
  { value: 'personal', label: '개인' },
  { value: 'business', label: '사업자' },
  { value: 'closed', label: '마감', disabled: true },
];
export default function SelectFieldExample() {
  const [value, setValue] = useState('');
  return (
    <section style={{ maxWidth: 375, display: 'grid', gap: 24 }}>
      <SelectField
        label="신청 유형"
        helperText="유형을 선택하세요."
        options={options}
        value={value}
        onValueChange={setValue}
      />
      <SelectField variant="line" aria-label="신청 유형" options={options} />
      <SelectField label="신청 유형" options={options} disabled />
    </section>
  );
}
