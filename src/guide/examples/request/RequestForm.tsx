import type { SubmitEvent } from 'react';
import Badge from '../../../components/Badge/Badge.tsx';
import BottomCTA from '../../../components/BottomCTA/BottomCTA.tsx';
import ApplicantFields from './ApplicantFields.tsx';
import ServiceFields from './ServiceFields.tsx';
import type { ChangeField, RequestValues } from './types.ts';
import styles from './RequestForm.module.scss';

type RequestFormProps = {
  values: RequestValues;
  onChange: ChangeField;
  onCheckEmail: () => void;
  emailHelp: string;
  onReview: () => void;
};
export default function RequestForm({
  values,
  onChange,
  onCheckEmail,
  emailHelp,
  onReview,
}: RequestFormProps) {
  function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    onReview();
  }
  return (
    <form className={styles.form} onSubmit={submit}>
      <header className={styles.intro}>
        <Badge variant="fill" tone="brand-weak" size="s">
          컴포넌트 조합 예제
        </Badge>
        <h2>입력부터 확인까지</h2>
        <p>
          예시 데이터를 입력해 보세요.
          <br />
          입력 → 확인 시트 → 완료 모달로 연결됩니다.
        </p>
      </header>
      <fieldset className={styles.fields}>
        <legend>신청자 정보</legend>
        <ApplicantFields
          values={values}
          onChange={onChange}
          onCheckEmail={onCheckEmail}
          emailHelp={emailHelp}
        />
      </fieldset>
      <fieldset className={styles.fields}>
        <legend>문의 내용</legend>
        <ServiceFields values={values} onChange={onChange} />
      </fieldset>
      <footer className={styles.footer}>
        <p>화면 연결 예제이며 실제 신청·인증·서버 전송은 하지 않습니다.</p>
        <BottomCTA className={styles.cta} primary={{ label: '입력 내용 확인', type: 'submit' }} />
      </footer>
    </form>
  );
}
