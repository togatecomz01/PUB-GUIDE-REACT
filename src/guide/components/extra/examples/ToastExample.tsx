import { useState } from 'react';
import Button from '../../../../components/Button/Button.tsx';
import Toast from '../../../../components/Toast/Toast.tsx';
export default function ToastExample() {
  const [open, setOpen] = useState(false);
  return (
    <section style={{ maxWidth: 375 }}>
      <Button onClick={() => setOpen(true)} disabled={open}>
        완료 메시지 보기
      </Button>
      <Toast
        open={open}
        message="처리가 완료되었습니다."
        duration={3000}
        onClose={() => setOpen(false)}
      />
    </section>
  );
}
