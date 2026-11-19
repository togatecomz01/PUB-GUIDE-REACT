import BottomSheet from '../../../components/BottomSheet/BottomSheet.tsx';
import { serviceOptions } from './types.ts';
import type { RequestValues } from './types.ts';
import styles from './ReviewSheet.module.scss';

type ReviewSheetProps = {
  open: boolean;
  values: RequestValues;
  onClose: () => void;
  onConfirm: () => void;
};
export default function ReviewSheet({ open, values, onClose, onConfirm }: ReviewSheetProps) {
  const service = serviceOptions.find((option) => option.value === values.service)?.label;
  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title="입력 내용을 확인해 주세요"
      description="앞에서 입력한 값을 props로 전달받아 표시합니다."
      actions={{
        primary: { label: '예제 완료', onClick: onConfirm },
        secondary: { label: '수정하기', onClick: onClose },
      }}
    >
      <dl className={styles.summary}>
        <dt>이름</dt>
        <dd>{values.name}</dd>
        <dt>이메일</dt>
        <dd>{values.email}</dd>
        <dt>문의 유형</dt>
        <dd>{service}</dd>
        {values.note && (
          <>
            <dt>요청사항</dt>
            <dd>{values.note}</dd>
          </>
        )}
      </dl>
    </BottomSheet>
  );
}
