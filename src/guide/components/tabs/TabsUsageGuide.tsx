import tabListSource from '../../../components/tabs/TabList/TabList.tsx?raw';
import { CodeReadingGuide, CodeBlock } from '../../ui/GuideUi.tsx';
import { nestedTabs, tabOptions, tabPage, tabPageStyles } from './tabExamples.ts';
import ui from '../../ui/GuideUi.module.scss';

export default function TabsUsageGuide({ clip = false }: { clip?: boolean }) {
  const name = clip ? 'TabClip' : 'Tab';
  return (
    <section className={ui.section} aria-labelledby="tabs-usage">
      <h2 id="tabs-usage">실제 페이지에서 사용하기</h2>
      <CodeReadingGuide
        note="TabList는 탭 계열의 공통 내부 부품입니다. selected는 유효한 선택값이고 move는 방향키·Home·End를 처리합니다. 드래그와 너비 감지는 기존 공통 훅이 담당합니다."
        sources={[{ name: 'TabList.tsx', code: tabListSource }]}
      />
      <p className={ui.muted}>
        필요한 코드만 펼쳐서 복사하세요. <a href="#styles">가져올 파일 보기 →</a>
      </p>
      <details className={ui.disclosure}>
        <summary>탭 전환까지 포함한 페이지 전체 예제</summary>
        <CodeBlock label={`${name} 페이지 전체 예제 · ExamplePage.tsx`} code={tabPage(clip)} />
        <CodeBlock
          label={`${name} 페이지 스타일 · ExamplePage.module.scss`}
          language="SCSS"
          code={tabPageStyles}
        />
        <p className={ui.muted}>
          value는 선택한 항목의 고유 값이며 onValueChange로 변경합니다. items의 label은 메뉴 문구,
          content는 선택했을 때 보일 내용입니다. 두 파일을 src/pages에 함께 두는 기준이며 375px은
          스크롤을 확인하기 위한 예시 폭입니다. 실제 페이지의 폭으로 바꿔 사용하세요.
        </p>
      </details>
      <details className={ui.disclosure}>
        <summary>첫 선택 항목·비활성화 메뉴 바꾸기</summary>
        <CodeBlock label={`${name} · 초기 선택과 disabled`} code={tabOptions(clip)} />
        <p className={ui.muted}>
          defaultValue는 처음 선택할 항목입니다. 이 예제는 이후 선택을 컴포넌트가 관리하므로
          useState가 필요하지 않습니다. 페이지에서 선택값을 관리할 때는 위 전체 예제처럼
          value·onValueChange를 사용합니다. disabled 항목은 클릭·키보드 선택에서 제외됩니다.
        </p>
      </details>
      <details className={ui.disclosure}>
        <summary>Tab 아래 TabClip을 조합하는 예시</summary>
        <p className={ui.muted}>
          아래 코드는 return 안에 넣는 호출 예제입니다. Tab과 TabClip을 각각 import한 뒤, 상위 탭의
          content에 하위 TabClip을 넣습니다. 각 그룹은 선택값을 따로 관리합니다.
        </p>
        <CodeBlock label="Tab + TabClip · 상위·하위 메뉴 조합" code={nestedTabs} />
      </details>
      <aside className={ui.callout} aria-label="탭 가로 스크롤 사용법">
        <strong>메뉴가 길어지면 가로 스크롤</strong>
        <p>
          메뉴가 넘칠 때만 가로 드래그와 grab 커서가 적용됩니다. 스크롤바는 숨깁니다. 짧게 클릭하면
          선택하고, 드래그하면 목록만 이동합니다. 터치·Shift+휠·방향키도 사용할 수 있습니다.
        </p>
      </aside>
    </section>
  );
}
