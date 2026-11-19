import Toast from '../../../components/Toast/Toast.tsx';
import RequestLayout from './RequestLayout.tsx';
import RequestForm from './RequestForm.tsx';
import ReviewSheet from './ReviewSheet.tsx';
import CompletionModal from './CompletionModal.tsx';
import useRequestExample from './useRequestExample.ts';

export default function RequestPage() {
  const demo = useRequestExample();
  return (
    <RequestLayout>
      <RequestForm
        values={demo.values}
        onChange={demo.changeField}
        emailHelp={demo.emailHelp}
        onCheckEmail={demo.checkEmail}
        onReview={demo.openReview}
      />
      <ReviewSheet
        open={demo.stage === 'review'}
        values={demo.values}
        onClose={demo.closeReview}
        onConfirm={demo.complete}
      />
      <CompletionModal open={demo.stage === 'complete'} onClose={demo.closeCompletion} />
      <Toast
        open={demo.toastOpen}
        message="예제 흐름을 끝까지 확인했습니다."
        onClose={demo.closeToast}
      />
    </RequestLayout>
  );
}
