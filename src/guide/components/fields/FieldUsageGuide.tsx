import inputBodySource from '../../../components/internal/InputBody/InputBody.tsx?raw';
import textFieldSource from '../../../components/TextField/TextField.tsx?raw';
import searchFieldSource from '../../../components/SearchField/SearchField.tsx?raw';
import selectFieldSource from '../../../components/SelectField/SelectField.tsx?raw';
import { CodeBlock } from '../../ui/GuideUi.tsx';
import {
  fieldSnippet,
  inputKinds,
  labelCombinations,
  searchFieldPage,
  textFieldPage,
} from './fieldExamples.ts';
import ui from '../../ui/GuideUi.module.scss';

export default function FieldUsageGuide({ search = false }: { search?: boolean }) {
  const name = search ? 'SearchField' : 'TextField';
  return (
    <section className={ui.section} aria-labelledby="field-usage">
      <h2 id="field-usage">실제 페이지에서 사용하기</h2>
      <FieldStructureGuide name={name} />
      <p className={ui.muted}>
        필요한 코드만 펼쳐서 복사하세요. <a href="#styles">가져올 파일 보기 →</a>
      </p>

      <details className={ui.disclosure}>
        <summary>값 관리까지 포함한 페이지 전체 예제</summary>
        <p className={ui.muted}>
          src/pages/ExamplePage.tsx에 작성하는 기준입니다. 다른 폴더에서 사용하면 import 경로를
          맞춰주세요. 프로젝트의 공통 스타일은 main.tsx에서 불러온 기존 구성을 사용합니다. value는
          현재 입력값, onValueChange는 값이 바뀔 때 호출할 함수입니다.
        </p>
        <CodeBlock
          label={`${name} 페이지 전체 예제`}
          code={search ? searchFieldPage : textFieldPage}
        />
        {search && (
          <p className={ui.muted}>
            Enter로 검색한 단어를 화면에 표시하는 예제입니다. 검색 서버 연동·결과 이동이 필요하면
            handleSearch 안에 연결합니다. 오른쪽 검색 버튼도 쓰려면 SearchField에 searchButton을
            추가합니다.
          </p>
        )}
      </details>

      {!search && (
        <>
          <details className={ui.disclosure}>
            <summary>입력 종류 바꾸기 — kind 6종</summary>
            <p className={ui.muted}>
              kind는 가운데 입력 구성을 정합니다. 생략하면 basic입니다. 아래 코드는 값 표시부터
              확인하는 간단한 호출 예제입니다. 페이지에서 값을 관리할 때는 위 전체 예제처럼
              value·onValueChange를 연결합니다.
            </p>
            <div className={ui.twoColumn}>
              {inputKinds.map(({ kind, label }) => (
                <CodeBlock key={kind} label={`${kind} · ${label}`} code={fieldSnippet({ kind })} />
              ))}
            </div>
            <p className={ui.muted}>
              phone의 ‘요청’과 code의 ‘시간연장’ 클릭은 onAction으로 연결합니다. remainingTime은
              화면에서 계산한 시간을 표시하며, 인증 요청·타이머·금액 표시 형식은 컴포넌트가 자동으로
              처리하지 않습니다.
            </p>
          </details>

          <details className={ui.disclosure}>
            <summary>박스형·라인형 바꾸기 — variant 2종</summary>
            <p className={ui.muted}>
              variant는 입력 외곽의 모양입니다. kind와 독립적으로 선택하며 생략하면 box입니다. 같은
              이메일 입력도 아래처럼 모양만 바꿀 수 있습니다.
            </p>
            <div className={ui.twoColumn}>
              <CodeBlock
                label="박스형 · variant=box"
                code={fieldSnippet({ kind: 'email', variant: 'box' })}
              />
              <CodeBlock
                label="라인형 · variant=line"
                code={fieldSnippet({ kind: 'email', variant: 'line' })}
              />
            </div>
          </details>
        </>
      )}

      <details className={ui.disclosure}>
        <summary>레이블·안내문구 각각 빼기 — 4가지 작성 예시</summary>
        <p className={ui.muted}>
          label은 위쪽 레이블, helperText는 아래쪽 안내문구입니다. 필요 없는 속성을 작성하지 않으면
          해당 태그와 여백도 없어집니다. 레이블을 빼면 aria-label로 입력 목적을 알려주세요.
          {search
            ? ' 검색 필드도 동일한 방식입니다.'
            : ' 모든 kind와 variant에 같은 방식으로 적용합니다.'}
        </p>
        <div className={ui.twoColumn}>
          {labelCombinations.map(({ title, label, help }) => (
            <CodeBlock
              key={title}
              label={`${name} · ${title}`}
              code={fieldSnippet({ search, label, help })}
            />
          ))}
        </div>
        <CodeBlock
          label={`${name} · 조건에 따라 문구 생략하기`}
          code={`<${name}${search ? '' : '\n  kind="basic"'}
  aria-label="${search ? '검색어' : '이름'}"
  label={showLabel ? '${search ? '검색어' : '이름'}' : undefined}
  helperText={showHelp ? '${search ? '검색할 단어를' : '이름을'} 입력해 주세요.' : undefined}
/>`}
        />
        <p className={ui.muted}>
          조건부 예제의 showLabel·showHelp는 사용하는 페이지에서 정하는 boolean 값입니다.
          undefined를 전달해도 속성을 생략한 것과 같습니다. aria-label은 화면에 표시되는 문구가
          아니므로 레이블 자리나 여백을 만들지 않습니다.
        </p>
      </details>
    </section>
  );
}

const fieldSources = {
  TextField: textFieldSource,
  SearchField: searchFieldSource,
  SelectField: selectFieldSource,
};

export function FieldStructureGuide({ name }: { name: keyof typeof fieldSources }) {
  return (
    <details className={ui.disclosure}>
      <summary>컴포넌트 내부 코드 읽는 순서</summary>
      <p className={ui.muted}>
        속성·기본값 → ID와 입력값 → 표시 조건 → 동작 함수 → JSX 순서입니다. 각 입력 컴포넌트에서
        useId로 ID를 만들고, FieldFrame의 getFieldIds로 레이블·설명·오류 연결 정보를 준비합니다.
      </p>
      <p className={ui.muted}>
        FieldFrame 태그 사이에 입력 영역을 넣으면 children으로 전달됩니다. 표시 조건은 화면을 그리는
        JSX 앞에서 정리하고, TextField·SearchField의 지우기는 clearValue 함수로 분리했습니다. 기존에
        전달하던 설정(props)과 사용법은 같습니다.
      </p>
      <CodeBlock label={name + '.tsx · 현재 구현 전체'} code={fieldSources[name]} />
      {name === 'TextField' && (
        <>
          <p className={ui.muted}>
            InputBody는 kind별 입력 부분입니다. changeUser·changeNumber처럼 동작에 이름을 붙였고,
            기본 입력의 모양·입력 방식은 JSX 앞에서 준비합니다.
          </p>
          <CodeBlock label="InputBody.tsx · 현재 입력 종류별 구현" code={inputBodySource} />
        </>
      )}
    </details>
  );
}
