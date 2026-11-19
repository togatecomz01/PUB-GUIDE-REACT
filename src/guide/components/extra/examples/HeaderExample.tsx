import { useState } from 'react';
import Header from '../../../../components/Header/Header.tsx';
export default function HeaderExample() {
  const [message, setMessage] = useState('');
  return (
    <section style={{ maxWidth: 375 }}>
      <Header
        type="main"
        name="홍길동"
        onHome={() => setMessage('홈으로 이동')}
        onAlarm={() => setMessage('알림 열기')}
        onMenu={() => setMessage('메뉴 열기')}
      />
      <Header type="popup" title="제목" gradient={false} onClose={() => setMessage('닫기')} />
      <p role="status">{message}</p>
    </section>
  );
}
