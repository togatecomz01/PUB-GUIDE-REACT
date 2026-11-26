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
        as="footer"
        layout="vertical"
        primary={{ label: '자세히보기', onClick: () => setMessage('상세 내용 보기') }}
        secondary={{ label: '추가하기', onClick: () => setMessage('항목 추가') }}
      />
      <p role="status">{message}</p>
    </section>
  );
}
