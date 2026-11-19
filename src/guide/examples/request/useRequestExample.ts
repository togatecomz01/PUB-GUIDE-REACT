import { useState } from 'react';
import type { RequestValues } from './types.ts';

type Stage = 'form' | 'review' | 'complete';
export default function useRequestExample() {
  const [values, setValues] = useState<RequestValues>({
    name: '',
    email: '',
    service: 'consultation',
    note: '',
  });
  const [stage, setStage] = useState<Stage>('form');
  const [emailHelp, setEmailHelp] = useState('입력 확인 버튼의 연결을 확인해 보세요.');
  const [toastOpen, setToastOpen] = useState(false);

  function changeField(field: keyof RequestValues, value: string) {
    setValues((previous) => ({ ...previous, [field]: value }));
    if (field === 'email') setEmailHelp('입력 확인 버튼의 연결을 확인해 보세요.');
  }
  function checkEmail() {
    setEmailHelp('폼 버튼에 연결한 함수를 실행했습니다. 실제 이메일 인증은 하지 않습니다.');
  }
  function openReview() {
    setToastOpen(false);
    setStage('review');
  }
  function closeReview() {
    setStage('form');
  }
  function complete() {
    setStage('complete');
  }
  function closeCompletion() {
    setStage('form');
    setToastOpen(true);
  }
  function closeToast() {
    setToastOpen(false);
  }

  return {
    values,
    stage,
    emailHelp,
    toastOpen,
    changeField,
    checkEmail,
    openReview,
    closeReview,
    complete,
    closeCompletion,
    closeToast,
  };
}
