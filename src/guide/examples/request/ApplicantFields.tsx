import TextField from '../../../components/TextField/TextField.tsx';
import FormButton from '../../../components/FormButton/FormButton.tsx';
import type { ChangeField, RequestValues } from './types.ts';

type ApplicantFieldsProps = {
  values: RequestValues;
  onChange: ChangeField;
  onCheckEmail: () => void;
  emailHelp: string;
};
export default function ApplicantFields({
  values,
  onChange,
  onCheckEmail,
  emailHelp,
}: ApplicantFieldsProps) {
  return (
    <>
      <TextField
        label="이름"
        name="name"
        autoComplete="off"
        placeholder="이름을 입력해 주세요"
        required
        value={values.name}
        onValueChange={(value) => onChange('name', value)}
      />
      <TextField
        label="이메일"
        name="email"
        type="email"
        autoComplete="off"
        placeholder="name@example.com"
        required
        value={values.email}
        onValueChange={(value) => onChange('email', value)}
        helperText={emailHelp}
        endAdornment={<FormButton onClick={onCheckEmail}>입력 확인</FormButton>}
      />
    </>
  );
}
