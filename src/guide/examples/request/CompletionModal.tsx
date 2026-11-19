import Modal from '../../../components/Modal/Modal.tsx';

export default function CompletionModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="예제 연결 완료"
      description="폼에서 입력한 내용이 확인 시트를 거쳐 완료 모달까지 연결되었습니다. 실제 신청은 전송하지 않았습니다."
      confirmLabel="화면으로 돌아가기"
    />
  );
}
