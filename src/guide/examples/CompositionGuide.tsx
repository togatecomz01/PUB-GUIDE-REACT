import RequestPage from './request/RequestPage.tsx';
import pageSource from './request/RequestPage.tsx?raw';
import { CodeBlock, PageTitle, SourceFiles } from '../ui/GuideUi.tsx';
import styles from './CompositionGuide.module.scss';
import ui from '../ui/GuideUi.module.scss';

const files = import.meta.glob('./request/*.{tsx,ts,scss}', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;
const fileOrder = [
  'RequestPage.tsx',
  'useRequestExample.ts',
  'RequestForm.tsx',
  'ApplicantFields.tsx',
  'ServiceFields.tsx',
  'ReviewSheet.tsx',
  'CompletionModal.tsx',
  'RequestLayout.tsx',
  'types.ts',
  'RequestForm.module.scss',
  'ReviewSheet.module.scss',
  'RequestLayout.module.scss',
];

export default function CompositionGuide() {
  return (
    <>
      <PageTitle
        number="28"
        title="화면 예제"
        description="입력창·확인 시트·모달을 한 화면에서 함께 사용해 보세요."
      />
      <a className={styles.open} href="?example=request" target="_blank" rel="noreferrer">
        예제 화면만 열기 ↗
      </a>
      <div className={styles.workbench}>
        <section className={styles.live} aria-label="신청 화면 실행 예제">
          <header>
            <strong>실행 화면</strong>
            <span>375px 예제</span>
          </header>
          <RequestPage />
        </section>
        <section className={styles.assembly}>
          <h2>이 화면을 만든 코드</h2>
          <p>필요한 컴포넌트를 놓고 같은 값과 버튼 동작으로 연결합니다.</p>
          <div className={styles.assemblyCode}>
            <CodeBlock label="RequestPage.tsx · 실제 조립 코드" code={pageSource.trim()} />
          </div>
        </section>
      </div>

      <p className={ui.muted}>
        <a href="#styles">다른 프로젝트에 가져갈 파일과 시작 순서 →</a>
      </p>
      <details className={ui.disclosure}>
        <summary>입력값이 시트·모달에 연결되는 원리</summary>
        <ol className={styles.explanation}>
          <li>
            <strong>입력:</strong> 폼이 <code>demo.changeField</code>를 호출해 훅의 입력값을
            바꿉니다.
          </li>
          <li>
            <strong>내용 확인:</strong> <code>openReview()</code>가 <code>stage='review'</code>로
            바꿉니다. 시트는 같은 입력값을 보여주며, ‘수정하기’로 돌아가도 값은 유지됩니다.
          </li>
          <li>
            <strong>예제 완료:</strong> <code>complete()</code>가 <code>stage='complete'</code>로
            바꿉니다. 시트는 닫히고 모달이 열립니다. 완료 모달에는 입력값 대신 <code>open</code>과{' '}
            <code>onClose</code>만 전달합니다.
          </li>
          <li>
            <strong>화면 복귀:</strong> 모달을 닫으면 <code>stage='form'</code>으로 돌아가고
            토스트를 보여줍니다.
          </li>
        </ol>
        <p className={ui.muted}>
          입력 확인 버튼을 누르면 연결한 함수가 실행되어 안내문구를 바꿉니다. 실제 신청·인증·저장은
          없습니다.
        </p>
      </details>
      <details className={ui.disclosure}>
        <summary>파일별 역할과 전체 소스 복사</summary>
        <p className={ui.muted}>
          useRequestExample은 이 예제 전용입니다. 다른 화면은 공통 UI를 재사용하고 화면
          구성·입력값·버튼 동작을 새로 작성합니다. 간단한 화면은 페이지 안의 useState만으로도
          충분합니다.
        </p>
        <p className={ui.muted}>
          공통 UI는 components/, 이 예제는 guide/examples/request/에 있습니다. 새 프로젝트에서는
          예제 폴더를 src/pages/examples/request/로 복사하고 <code>&lt;RequestPage /&gt;</code>를
          화면에 표시하세요.
          <a href="#styles"> 공통 파일 가져오기 안내 →</a>
        </p>
        <dl className={styles.roles}>
          <dt>RequestPage</dt>
          <dd>화면 부품 조립 · 값과 실행할 함수(props) 전달</dd>
          <dt>useRequestExample</dt>
          <dd>입력값 · 단계 · 실행할 함수 관리</dd>
          <dt>RequestForm</dt>
          <dd>신청자 정보 + 문의 내용 + 하단 버튼</dd>
          <dt>ReviewSheet / CompletionModal</dt>
          <dd>공통 시트·모달에 이 화면의 내용 연결</dd>
        </dl>
        {fileOrder.map((name) => (
          <details key={name} className={ui.disclosure}>
            <summary>
              {name.endsWith('.tsx')
                ? '화면 · TSX'
                : name.endsWith('.ts')
                  ? '값·동작 · TS'
                  : '스타일 · SCSS'}{' '}
              — {name}
            </summary>
            <CodeBlock
              label={name + ' · 전체 소스 복사'}
              code={files['./request/' + name].trim()}
              language={
                name.endsWith('scss') ? 'SCSS' : name.endsWith('.ts') ? 'TYPESCRIPT' : 'TSX'
              }
            />
          </details>
        ))}
      </details>
      <SourceFiles
        files={['src/guide/examples/request/', 'src/guide/examples/CompositionGuide.tsx']}
      />
    </>
  );
}
