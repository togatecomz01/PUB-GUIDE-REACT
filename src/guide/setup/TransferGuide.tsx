import { CodeBlock, PageTitle } from '../ui/GuideUi.tsx';
import {
  allComponentsTree,
  commonCodeRows,
  foundationFiles,
  dependencyRows,
  existingStyleEntry,
  existingEntryImports,
} from './transferExamples.ts';
import ImportExamplePage from '../examples/import/ImportExamplePage.tsx';
import pageCode from '../examples/import/ImportExamplePage.tsx?raw';
import hookCode from '../examples/import/useImportExample.ts?raw';
import pageStyleCode from '../examples/import/ImportExamplePage.module.scss?raw';
import ui from '../ui/GuideUi.module.scss';
export default function TransferGuide() {
  return (
    <>
      <PageTitle
        title="가져다 쓰기"
        description="필요한 공통 파일을 가져오고, pages/에서 새 화면을 만듭니다."
      />
      <section className={ui.section} aria-labelledby="project-transfer">
        <h2 id="project-transfer">새 프로젝트에서 시작하는 순서</h2>
        <ol className={ui.checkList}>
          <li>
            <strong>공통 파일 복사:</strong> components/·hooks/·utils/ 전체, assets/의 icons/ 전체와
            fonts/, 공통 styles 파일을 가져옵니다.
          </li>
          <li>
            <strong>스타일 연결:</strong> main.tsx에서{' '}
            <code>import './assets/styles/main.scss';</code>를 한 번 불러옵니다.
          </li>
          <li>
            <strong>새 화면 작성:</strong> 필요한 컴포넌트를 놓고 입력값·클릭 동작을 연결합니다.
          </li>
        </ol>
        <p className={ui.muted}>
          guide/는 안내와 실행 예제 전용입니다. 실제 프로젝트 화면은 pages/에 작성합니다. 파일은
          TSX=화면, TS=값·동작·타입, SCSS=모양·배치로 구분합니다.
        </p>
        <CodeBlock label="가져올 공통 폴더" language="TEXT" code={allComponentsTree} />
        <p className={ui.muted}>
          화면 예제의 RequestPage·RequestForm·useRequestExample·화면용 SCSS는 새 화면에 맞춰
          작성·수정합니다. 가이드 화면 자체는 복사하지 않습니다.
        </p>
        <p className={ui.muted}>
          components/의 Button·TextField 등은 페이지에서 직접 사용합니다. components/internal/은 이
          UI들이 내부에서 쓰는 보조 부품이며 페이지에서는 직접 가져오지 않습니다. 전체 복사할 때는
          internal/도 포함합니다. hooks/는 React에서 값·동작을 함께 쓰는 함수, utils/는 일반 함수와
          이미지 목록입니다. 체크박스·라디오·스위치 공통 스타일은
          assets/styles/mixins/_selection.scss에 있습니다. 이 세 컴포넌트는 utils/assets.ts의 이미지
          목록을 불러옵니다. 파일명은 ico_ 접두사와 소문자·밑줄로 통일합니다.
          <a href="#icon"> 아이콘 역할·추가 방법 →</a>
        </p>
        <details className={ui.disclosure}>
          <summary>공통 함수·훅은 언제 쓰나요?</summary>
          <p className={ui.muted}>
            utils에는 일반 함수·이미지 목록을, hooks에는 React에서 값·동작을 함께 쓰는 함수(훅)를
            둡니다. 기존 입력창·모달·탭을 페이지에서 사용할 때는 공통 훅을 다시 import하지 않아도
            됩니다.
          </p>
          <div className={ui.tableWrap}>
            <table className={ui.table}>
              <caption className={ui.sr}>
                공통 함수·이미지 목록·훅의 사용 시점과 실제 사용처
              </caption>
              <thead>
                <tr>
                  <th scope="col">파일</th>
                  <th scope="col">언제 직접 쓰나요?</th>
                  <th scope="col">현재 사용처</th>
                </tr>
              </thead>
              <tbody>
                {commonCodeRows.map((row) => (
                  <tr key={row.file}>
                    <th scope="row">
                      <code>{row.file}</code>
                    </th>
                    <td>{row.when}</td>
                    <td>{row.usedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={ui.muted}>
            아래 코드는 이 파일들을 사용하는 컴포넌트(TSX) 내부의 핵심 부분입니다. import는 파일
            상단에, 훅 호출은 컴포넌트 함수의 최상단에 둡니다. 조건문·반복문·클릭 함수 안에서 훅을
            호출하지 않습니다. 예시 경로는 src/components/컴포넌트명/ 기준이며 pages/ 바로
            아래에서는 ../hooks/·../utils/를 사용합니다. internal/ 안의 보조 부품은 폴더가 한 단계
            더 깊어 ../../../hooks/·../../../utils/를 사용합니다.
          </p>
          {commonCodeRows.map((row) => (
            <div key={row.file}>
              <p className={ui.muted}>
                <strong>{row.file}</strong>: {row.note}
              </p>
              <CodeBlock label={row.file + ' · 핵심 사용 예시'} code={row.code} />
            </div>
          ))}
          <p className={ui.muted}>
            <a href="#icon">assets.ts와 Icon의 차이·새 아이콘 추가 방법 →</a>
          </p>
        </details>
        <details className={ui.disclosure}>
          <summary>실제 페이지에서 컴포넌트·훅을 import해서 쓰기</summary>
          <p className={ui.muted}>
            이 예제는 src/guide/examples/import/ 기준입니다. ../../../는 src/까지 세 단계 올라간다는
            뜻입니다. 파일을 다른 폴더로 옮기면 상대 경로도 맞춥니다.
          </p>
          <div className={ui.liveStage}>
            <ImportExamplePage />
          </div>
          <p className={ui.muted}>
            입력값과 모달 상태는 화면 전용 훅에서 관리합니다. 공통 스타일은 main.tsx에서 한 번
            연결합니다.
          </p>
          <CodeBlock label="ImportExamplePage.tsx · 화면 조합" code={pageCode} />
          <CodeBlock
            label="useImportExample.ts · 이 화면의 값과 동작"
            language="TYPESCRIPT"
            code={hookCode}
          />
          <CodeBlock
            label="ImportExamplePage.module.scss · 이 화면의 배치"
            language="SCSS"
            code={pageStyleCode}
          />
          <p className={ui.muted}>
            useImportExample은 이 예제 전용이므로 같은 폴더에 둡니다. 간단한 화면에서는 useState를
            페이지 TSX 안에 직접 작성해도 됩니다.
          </p>
        </details>
        <details className={ui.disclosure}>
          <summary>공통 스타일·폰트의 정확한 파일 목록</summary>
          <CodeBlock label="공통 파일 목록" language="TEXT" code={foundationFiles.join('\n')} />
          <p className={ui.muted}>
            Button·FormButton·Icon·Checkbox·Radio 기준으로 공통 스타일을 확인합니다. 나머지
            컴포넌트의 색상은 Sass 변수 적용 후 확인합니다. 폰트 라이선스도 함께 복사합니다.
          </p>
        </details>
        <details className={ui.disclosure}>
          <summary>필요한 컴포넌트만 가져올 때</summary>
          <p className={ui.muted}>
            기본 색상, 크기, 글자 굵기는 <code>assets/styles/tokens/_primitives.scss</code>에
            있습니다. Button·FormButton·Checkbox·Radio를 가져오면{' '}
            <code>assets/styles/tokens/_semantic-colors.scss</code>도 함께 복사합니다. 다른
            컴포넌트가 내부에서 사용하는 경우에도 같은 파일이 필요합니다.
          </p>
          <div className={ui.tableWrap}>
            <table className={ui.table}>
              <caption className={ui.sr}>컴포넌트별 함께 가져올 파일</caption>
              <thead>
                <tr>
                  <th scope="col">컴포넌트</th>
                  <th scope="col">함께 가져오기</th>
                  <th scope="col">추가 파일</th>
                </tr>
              </thead>
              <tbody>
                {dependencyRows.map((row) => (
                  <tr key={row.component}>
                    <th scope="row">{row.component}</th>
                    <td>{row.folders}</td>
                    <td>{row.extra}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
        <details className={ui.disclosure}>
          <summary>기존 main.scss가 있다면</summary>
          <p className={ui.muted}>
            기존 파일을 유지하고 별도 공통 스타일 파일로 연결합니다. 중복 초기화는 합칩니다. 글자
            크기 rem 토큰은 html의 16px을 기준으로 계산합니다.
          </p>
          <CodeBlock
            label="assets/styles/pub-guide.scss"
            language="SCSS"
            code={existingStyleEntry}
          />
          <CodeBlock label="main.tsx에서 한 번 연결" code={existingEntryImports} />
        </details>
        <details className={ui.disclosure}>
          <summary>개발 환경 설정이 필요할 때</summary>
          <p className={ui.muted}>
            현재 소스는 React 19·TypeScript·Vite 기준입니다. 다른 구성에서는 개발 담당자와 SCSS·SVG
            불러오기 설정을 확인하세요. 폰트 패키지는 필요하지 않습니다.
          </p>
          <CodeBlock
            label="SCSS 처리 도구가 없는 경우"
            language="TERMINAL"
            code="npm install -D sass"
          />
          <CodeBlock
            label="Vite 파일 종류 선언 · vite-env.d.ts"
            language="TYPESCRIPT"
            code={'/// <reference types="vite/client" />'}
          />
          <CodeBlock
            label="기존 tsconfig.json에 필요한 항목만 합치기"
            language="JSON"
            code={JSON.stringify(
              { compilerOptions: { allowImportingTsExtensions: true, noEmit: true } },
              null,
              2,
            )}
          />
        </details>
      </section>
    </>
  );
}
