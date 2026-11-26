import { useState } from 'react';
import TextButton from '../../../../components/buttons/TextButton/TextButton.tsx';
import Icon from '../../../../components/Icon/Icon.tsx';

export default function TextButtonExample() {
  const [message, setMessage] = useState('');
  return (
    <section style={{ display: 'grid', gap: 24, justifyItems: 'start' }}>
      <TextButton appearance="arrow" size="l" onClick={() => setMessage('상세 보기')}>
        자세히 보기
      </TextButton>
      <TextButton appearance="underline" tone="neutral" onClick={() => setMessage('약관 보기')}>
        약관 확인
      </TextButton>
      <TextButton
        icon={<Icon name="download" />}
        iconPosition="start"
        onClick={() => setMessage('다운로드 처리')}
      >
        파일 다운로드
      </TextButton>
      <TextButton disabled>사용할 수 없음</TextButton>
      <p role="status">{message}</p>
    </section>
  );
}
