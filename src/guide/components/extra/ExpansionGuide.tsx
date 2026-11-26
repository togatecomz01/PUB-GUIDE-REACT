import KeypadSource from '../../../components/Keypad/Keypad.tsx?raw';
import TooltipSource from '../../../components/Tooltip/Tooltip.tsx?raw';
import SegmentedControlSource from '../../../components/SegmentedControl/SegmentedControl.tsx?raw';
import BottomSheetSource from '../../../components/BottomSheet/BottomSheet.tsx?raw';
import HeaderSource from '../../../components/Header/Header.tsx?raw';
import TextButtonSource from '../../../components/TextButton/TextButton.tsx?raw';
import { FieldStructureGuide } from '../fields/FieldUsageGuide.tsx';
import { figmaLink } from '../../colors/foundations.ts';
import bankLogo from '../../assets/bank-example.png';
import { Fragment, useState } from 'react';
import type { ComponentType } from 'react';
import Icon, { iconNames } from '../../../components/Icon/Icon.tsx';
import Badge from '../../../components/Badge/Badge.tsx';
import TextButton from '../../../components/TextButton/TextButton.tsx';
import FormButton from '../../../components/FormButton/FormButton.tsx';
import Header from '../../../components/Header/Header.tsx';
import { SheetCard, SheetOptions } from '../../../components/BottomSheet/BottomSheet.tsx';
import Toast from '../../../components/Toast/Toast.tsx';
import {
  CodeReadingGuide,
  PageTitle,
  CodeBlock,
  PropTable,
  SourceFiles,
} from '../../ui/GuideUi.tsx';
import { expansionPages } from './expansionData.ts';
import type { ExpansionId } from './expansionData.ts';
import ui from '../../ui/GuideUi.module.scss';
import styles from './ExpansionGuide.module.scss';
import preview from '../PreviewStates.module.scss';
import sheetExample from './examples/BottomSheetExample.module.scss';
const exampleCode = import.meta.glob<string | undefined>('./examples/*Example.tsx', {
  query: '?raw',
  import: 'default',
  eager: true,
});
const examples = import.meta.glob<ComponentType | undefined>('./examples/*Example.tsx', {
  import: 'default',
  eager: true,
});
const readingGuides: Partial<Record<ExpansionId, { name: string; code: string; note: string }>> = {
  textbutton: {
    name: 'TextButton.tsx',
    code: TextButtonSource,
    note: 'iconSize는 크기별 화살표 크기입니다. 직접 전달한 icon을 우선하고, 없을 때만 기본 화살표를 표시합니다.',
  },
  header: {
    name: 'Header.tsx',
    code: HeaderSource,
    note: 'isMain·isSub·isPopup으로 종류를 구분하고 content에 표시할 내용을 고릅니다. renderAction은 이름·아이콘·클릭 동작이 있는 버튼을 만듭니다.',
  },
  bottomsheet: {
    name: 'BottomSheet.tsx',
    code: BottomSheetSource,
    note: 'cancelSheet는 Esc, clickBackdrop은 배경 클릭을 처리합니다. SheetOptions는 선택·체크 표시 조건을 따로 계산합니다.',
  },
  segmented: {
    name: 'SegmentedControl.tsx',
    code: SegmentedControlSource,
    note: 'measure는 넘치는 방향을 확인합니다. 표시 조건은 가장자리의 흐린 표시와 이동 버튼을 고르고 scrollBack은 앞쪽으로 스크롤합니다. TabList의 선택·키보드·드래그 동작은 공유합니다.',
  },
  tooltip: {
    name: 'Tooltip.tsx',
    code: TooltipSource,
    note: 'toggle은 열기·닫기, close는 닫기와 안내 버튼으로 키보드 선택 위치 복귀, handleKeyDown은 Esc를 담당합니다. 외부 클릭 이벤트는 열렸을 때 연결하고 해제합니다.',
  },
  keypad: {
    name: 'Keypad.tsx',
    code: KeypadSource,
    note: 'keys는 숫자 배열이고 amounts는 금액 버튼 목록입니다. 입력값 계산은 페이지에서 onKey·onBackspace·onAmount로 연결합니다.',
  },
};
const tones = ['brand', 'error', 'success', 'warning', 'gray'] as const;
function Gallery({ id }: { id: ExpansionId }) {
  if (id === 'icon')
    return (
      <div className={styles.icons}>
        {iconNames.map((name) => (
          <div key={name}>
            <Icon name={name} />
            <code>{name}</code>
          </div>
        ))}
      </div>
    );
  if (id === 'badge')
    return (
      <div className={styles.grid}>
        {(['l', 's'] as const).flatMap((size) => [
          <section key={size + 'line'}>
            <h3>Line · {size.toUpperCase()}</h3>
            {tones.map((tone) => (
              <p key={tone}>
                <Badge size={size} tone={tone}>
                  {tone}
                </Badge>
              </p>
            ))}
          </section>,
          <section key={size + 'fill'}>
            <h3>Fill · {size.toUpperCase()}</h3>
            {([...tones, 'brand-weak'] as const).map((tone) => (
              <p key={tone}>
                <Badge size={size} variant="fill" tone={tone}>
                  {tone}
                </Badge>
              </p>
            ))}
          </section>,
        ])}
      </div>
    );
  if (id === 'formbutton')
    return (
      <div className={styles.states}>
        <div>
          <small>Default</small>
          <FormButton>버튼명</FormButton>
        </div>
        <div>
          <small>Pressed</small>
          <FormButton className={preview.formButton}>버튼명</FormButton>
        </div>
        <div>
          <small>Disabled</small>
          <FormButton disabled>버튼명</FormButton>
        </div>
      </div>
    );
  if (id === 'textbutton')
    return (
      <div className={styles.textGallery}>
        {(['s', 'm', 'l'] as const).flatMap((size) =>
          (['arrow', 'clear', 'underline'] as const).flatMap((appearance) =>
            (['brand', 'neutral'] as const).map((tone) => (
              <section key={size + appearance + tone}>
                <h3>
                  {size} · {appearance} · {tone}
                </h3>
                <TextButton size={size} appearance={appearance} tone={tone}>
                  버튼레이블
                </TextButton>
                <TextButton
                  size={size}
                  appearance={appearance}
                  tone={tone}
                  className={tone === 'brand' ? preview.textBrand : preview.textNeutral}
                >
                  버튼레이블
                </TextButton>
                <TextButton size={size} appearance={appearance} tone={tone} disabled>
                  버튼레이블
                </TextButton>
              </section>
            )),
          ),
        )}
      </div>
    );
  if (id === 'header')
    return (
      <div className={styles.stack}>
        {(['main', 'main-sub', 'sub', 'sub-page', 'popup'] as const).map((type) => (
          <section key={type}>
            <small>{type}</small>
            <div className={styles.mobile}>
              <Header
                type={type}
                name="홍길동"
                title="타이틀"
                onBack={() => {}}
                onClose={() => {}}
                onHome={() => {}}
                onMenu={() => {}}
                onAlarm={() => {}}
              />
            </div>
          </section>
        ))}
      </div>
    );
  if (id === 'bottomsheet') return <SheetGallery />;
  if (id === 'toast')
    return (
      <div className={styles.mobile}>
        <Toast
          open
          message="메시지를 입력해 주세요."
          duration={0}
          position="inline"
          onClose={() => {}}
        />
      </div>
    );
  return null;
}
function SheetGallery() {
  const [value, setValue] = useState('a');
  const [bank, setBank] = useState<string>();
  const bankGroups = [9, 6].map((count, section) =>
    Array.from({ length: count }, (_, index) => ({
      value: section + '-' + index,
      label: '은행명',
      image: bankLogo,
    })),
  );
  const items = ['a', 'b', 'c'].map((value, index) => ({
    value,
    label: '은행명',
    description: '계좌번호',
    image: bankLogo,
    disabled: index > 0,
  }));
  return (
    <div className={styles.sheetGrid}>
      <SheetCard title="타이틀 내용" actions={{ primary: { label: '버튼명' } }}>
        <p>본문 내용이 들어갑니다.</p>
      </SheetCard>
      <SheetCard
        title="타이틀 내용"
        actions={{
          primary: { label: '버튼명' },
          secondary: { label: '버튼명' },
        }}
      >
        <SheetOptions aria-label="계좌 예시" items={items} value={value} onValueChange={setValue} />
      </SheetCard>
      <SheetCard title="타이틀 내용">
        {bankGroups.map((items, index) => (
          <Fragment key={items.length}>
            {index > 0 && <h3 className={sheetExample.bankHeading}>타이틀 내용</h3>}
            <SheetOptions
              kind="bank"
              aria-label={'은행 예시 ' + (index + 1)}
              items={items}
              value={bank}
              onValueChange={setBank}
            />
          </Fragment>
        ))}
      </SheetCard>
    </div>
  );
}
export default function ExpansionGuide({ id }: { id: ExpansionId }) {
  const page = expansionPages.find((page) => page.id === id)!;
  const fileName = page.example + 'Example.tsx';
  const key = './examples/' + fileName;
  const Example = examples[key];
  const code = exampleCode[key]
    ?.replaceAll('../../../../components/', '../components/')
    .replace('../../../assets/bank-example.png', './bank-example.png')
    .trim();
  const showGallery = ['icon', 'badge', 'formbutton', 'textbutton', 'header'].includes(id);
  const reading = readingGuides[id];
  return (
    <>
      <PageTitle
        number={page.index}
        title={'<' + page.title + '>'}
        description={page.description}
        node={page.node}
      />
      {(!Example || code === undefined) && (
        <aside className={ui.callout}>
          <strong>예제 파일을 찾을 수 없습니다</strong>
          <p>
            <code>{fileName}</code> 파일이 예제 폴더에 있는지 확인해 주세요. 파일명을 바꿨다면
            <code> expansionData.ts</code>의 <code>example</code> 값도 함께 수정해 주세요.
          </p>
        </aside>
      )}
      {(showGallery || Example) && (
        <section className={ui.section}>
          <h2>모양과 동작 확인</h2>
          <div className={styles.preview}>
            {showGallery && <Gallery id={id} />}
            {!showGallery && Example && <Example />}
          </div>
          {id === 'bottomsheet' && (
            <p className={ui.muted}>은행 선택 시트는 바깥 배경을 누르거나 Esc로 닫을 수 있어요.</p>
          )}
        </section>
      )}
      {code !== undefined && <CodeBlock label={page.title + ' · 사용 예제 복사'} code={code} />}
      {id === 'bottomsheet' && code !== undefined && (
        <p className={ui.muted}>
          예제를 복사할 때는 예제 파일 옆에 <code>BottomSheetExample.module.scss</code>와
          <code> bank-example.png</code>를 함께 두세요.
        </p>
      )}
      {id === 'selectfield' && <FieldStructureGuide name="SelectField" />}
      {reading && <CodeReadingGuide note={reading.note} sources={[reading]} />}
      {id === 'icon' && (
        <details className={ui.disclosure}>
          <summary>assets.ts와 Icon 역할 · 새 아이콘 추가하기</summary>
          <ul className={ui.checkList}>
            <li>
              <code>utils/assets.ts</code>: 체크박스·라디오·스위치의 크기·상태별 SVG 목록입니다.
              선택 컴포넌트 내부에서 사용하며, 페이지에서는 Checkbox·Radio·Switch를 배치합니다.
            </li>
            <li>
              <code>components/Icon/Icon.tsx</code>: 검색·닫기 같은 공통 SVG를 화면에 그립니다.
              페이지와 컴포넌트에서 <code>&lt;Icon name="search" /&gt;</code>로 사용합니다.
            </li>
          </ul>
          <p className={ui.muted}>카드 아이콘 credit_card를 새로 추가하는 경우의 예시입니다.</p>
          <ol className={ui.checkList}>
            <li>
              <strong>SVG 저장:</strong> 사용할 원본 파일을
              <code> src/assets/icons/ico_credit_card.svg</code>로 추가합니다.
            </li>
            <li>
              <strong>이름 등록:</strong> Icon.tsx의 <code>iconNames</code> 배열에
              <code> credit_card</code>를 추가합니다. 기존 항목은 유지합니다.
            </li>
            <li>
              <strong>화면에서 사용:</strong> 아래 페이지 예시처럼 Icon을 import합니다. 일반 아이콘
              추가 시 assets.ts는 수정하지 않습니다.
            </li>
          </ol>
          <CodeBlock
            label="기존 iconNames 배열에 추가할 한 줄"
            language="TYPESCRIPT"
            code={"// Icon.tsx의 기존 iconNames 배열 안에 한 줄 추가합니다.\n'credit_card',"}
          />
          <CodeBlock
            label="등록 후 사용 · src/pages/ExamplePage.tsx"
            code={
              'import Icon from \'../components/Icon/Icon.tsx\';\n\nexport default function ExamplePage() {\n  return (\n    <button type="button">\n      <Icon name="credit_card" size={24} />\n      카드 등록\n    </button>\n  );\n}'
            }
          />
          <p className={ui.muted}>
            단독 아이콘에는 label을 제공합니다. 버튼 문구가 있으면 위 예시처럼 label을 생략합니다.
            폴더 위치가 달라지면 import 상대 경로도 맞춥니다.
          </p>
          <p className={ui.muted}>
            체크박스·라디오·스위치의 SVG는 아이콘 폴더의 selection/에 두고 utils/assets.ts에
            연결합니다. 계좌형 체크와 입력용 SVG는 쓰는 컴포넌트에서 직접 불러옵니다.
          </p>
        </details>
      )}
      <details className={ui.disclosure}>
        <summary>설정을 바꿔 쓰려면</summary>
        <PropTable rows={[...page.props]} />
      </details>
      <details className={ui.disclosure}>
        <summary>사용할 때 참고할 점</summary>
        <ul className={ui.checkList}>
          {page.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
        {id === 'accordion' && (
          <p className={ui.muted}>
            <a href={figmaLink('450:2985')} target="_blank" rel="noreferrer">
              Box형 디자인 원본 ↗
            </a>
          </p>
        )}
      </details>
      {showGallery && Example && (
        <details className={ui.disclosure}>
          <summary>실제 화면에서 함께 사용하는 예제</summary>
          <div className={styles.preview}>
            <Example />
          </div>
        </details>
      )}
      {['bottomsheet', 'toast'].includes(id) && (
        <details className={ui.disclosure}>
          <summary>다른 모양 보기</summary>
          <div className={styles.preview}>
            <Gallery id={id} />
          </div>
        </details>
      )}
      {id === 'keypad' && (
        <CodeBlock
          label="금액 버튼을 사용하지 않을 때"
          code={'<Keypad amountButtons={false} onKey={append} onBackspace={removeLast} />'}
        />
      )}
      {id === 'selectfield' && (
        <CodeBlock
          label="레이블·안내문구를 독립적으로 생략"
          code={
            '<SelectField label="유형" options={options} />\n<SelectField aria-label="유형" helperText="선택해 주세요." options={options} />\n<SelectField aria-label="유형" options={options} />'
          }
        />
      )}
      {id === 'bottomcta' && (
        <CodeBlock
          label="하단 고정 사용 시 페이지에서 배치"
          code={
            '// fixed는 브라우저의 실제 표시 영역 기준입니다. 본문에 CTA 실제 높이만큼 하단 공간을 둡니다.\n<BottomCTA position="fixed" primary={{ label: "계속", onClick: handleNext }} />'
          }
        />
      )}
      <p className={ui.muted}>
        <a href="#styles">다른 프로젝트로 가져올 파일·공통 스타일 로드 →</a>
      </p>
      <SourceFiles
        files={[
          'src/components/' + page.title + '/',
          ...(Example || code !== undefined
            ? ['src/guide/components/extra/examples/' + fileName]
            : []),
          ...(id === 'bottomsheet'
            ? [
                'src/guide/components/extra/examples/BottomSheetExample.module.scss',
                'src/guide/assets/bank-example.png',
              ]
            : []),
        ]}
      />
    </>
  );
}
