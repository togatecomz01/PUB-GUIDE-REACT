import checkboxSource from '../../../components/Checkbox/Checkbox.tsx?raw';
import { CodeReadingGuide, CodeBlock } from '../../ui/GuideUi.tsx';
import {
  checkboxGroupPage,
  choiceNames,
  choiceOptions,
  choicePage,
  choiceStyles,
} from './choiceExamples.ts';
import type { ChoiceKind } from './choiceExamples.ts';
import ui from '../../ui/GuideUi.module.scss';

export default function ChoiceUsageGuide({ kind }: { kind: ChoiceKind }) {
  const name = choiceNames[kind];
  return (
    <section className={ui.section} aria-labelledby="choice-usage">
      <h2 id="choice-usage">실제 페이지에서 사용하기</h2>
      {kind === 'checkbox' && (
        <CodeReadingGuide
          note="isBox는 박스형 여부를 정합니다. 체크 상태는 기본 input과 CSS가 처리하며, 이미지 목록과 disabled·name·폼 동작은 그대로입니다."
          sources={[{ name: 'Checkbox.tsx', code: checkboxSource }]}
        />
      )}
      <p className={ui.muted}>
        필요한 코드만 펼쳐서 복사하세요. <a href="#styles">가져올 파일 보기 →</a>
      </p>
      <details className={ui.disclosure}>
        <summary>선택값 관리까지 포함한 페이지 전체 예제</summary>
        <CodeBlock label={`${name} 페이지 전체 예제`} code={choicePage(kind)} />
        <p className={ui.muted}>
          {kind === 'radio'
            ? '같은 name으로 묶고 각 항목에 다른 value를 줍니다. checked는 현재 선택값과 비교하고, onChange에서 event.target.value를 저장합니다. useId로 그룹 이름을 만들면 화면이 여러 번 사용되어도 다른 그룹과 섞이지 않습니다.'
            : 'checked는 현재 선택 상태입니다. onChange에서 event.target.checked를 받아 화면의 state를 바꿉니다. 서버 저장·동의 처리 등의 업무 동작은 사용하는 페이지에서 연결합니다.'}
        </p>
      </details>
      <details className={ui.disclosure}>
        <summary>{kind === 'checkbox' ? '종류 3종·크기 2종 바꾸기' : '크기 S·M 바꾸기'}</summary>
        <p className={ui.muted}>
          아래 코드는 return 안에 넣는 호출 예제입니다.
          {kind === 'checkbox'
            ? ' variant는 square·line·box, size는 s·m입니다. 생략하면 square·s입니다.'
            : kind === 'radio'
              ? ' size는 s·m이며 기본은 s입니다. 같은 그룹에서는 크기를 맞춰주세요.'
              : ' size는 s·m이며 기본은 m입니다.'}
        </p>
        <div className={ui.twoColumn}>
          {choiceStyles(kind).map(({ title, code }) => (
            <CodeBlock key={title} label={`${name} · ${title}`} code={code} />
          ))}
        </div>
      </details>
      <details className={ui.disclosure}>
        <summary>레이블 생략·초기 선택·비활성화 예시</summary>
        <p className={ui.muted}>
          label을 생략하면 문구 영역도 없어집니다. 이때 aria-label로 선택 목적을 알려주세요.
          defaultChecked는 처음 상태만 정하며, 이후 선택은 기본 input이 관리합니다. 페이지에서
          선택값을 관리하려면 위 전체 예제의 checked·onChange를 사용합니다.
        </p>
        <div className={ui.twoColumn}>
          {choiceOptions(kind).map(({ title, code }) => (
            <CodeBlock key={title} label={`${name} · ${title}`} code={code} />
          ))}
        </div>
        {kind === 'radio' && (
          <p className={ui.muted}>
            위 호출은 각각 따로 쓰는 예시입니다. 실제 그룹에서는 name을 동일하게, value를 서로
            다르게 작성하고 defaultChecked는 한 항목에만 지정합니다.
          </p>
        )}
      </details>
      {kind === 'checkbox' && (
        <details className={ui.disclosure}>
          <summary>여러 항목을 동시에 선택하는 페이지 예제</summary>
          <CodeBlock label="Checkbox 복수 선택 페이지 예제" code={checkboxGroupPage} />
        </details>
      )}
    </section>
  );
}
