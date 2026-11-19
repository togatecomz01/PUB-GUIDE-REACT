import { useState } from 'react';
import BottomCTA from '../../../../components/BottomCTA/BottomCTA.tsx';
export default function BottomCTAExample() {
  const [message, setMessage] = useState('');
  return (
    <section style={{ maxWidth: 375 }}>
      <BottomCTA
        primary={{ label: '다음', onClick: () => setMessage('다음 단계') }}
        secondary={{ label: '이전', onClick: () => setMessage('이전 단계') }}
      />
      <BottomCTA
        layout="vertical"
        weakVariant="tertiary"
        primary={{
          label: '선택한 내용으로 계속 진행하기',
          onClick: () => setMessage('계속 진행'),
        }}
        secondary={{
          label: '나중에 진행하기',
          onClick: () => setMessage('나중에 진행'),
        }}
      />
      <p role="status">{message}</p>
    </section>
  );
}
