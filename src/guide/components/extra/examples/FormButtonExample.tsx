import { useState } from 'react';
import TextField from '../../../../components/fields/TextField/TextField.tsx';
import FormButton from '../../../../components/buttons/FormButton/FormButton.tsx';

export default function FormButtonExample() {
  const [message, setMessage] = useState('');
  return (
    <section style={{ maxWidth: 375, display: 'grid', gap: 24 }}>
      <TextField
        label="인증번호"
        kind="code"
        remainingTime="3:30"
        onAction={() => setMessage('시간 연장 요청을 연결할 위치입니다.')}
      />
      <TextField
        label="이름"
        endAdornment={
          <FormButton onClick={() => setMessage('확인 요청을 연결할 위치입니다.')}>확인</FormButton>
        }
      />
      <div style={{ display: 'flex', alignItems: 'end', gap: 8 }}>
        <TextField label="추천 코드" />
        <FormButton onClick={() => setMessage('추천 코드 확인을 연결할 위치입니다.')}>
          확인
        </FormButton>
      </div>
      <p role="status">{message}</p>
    </section>
  );
}
