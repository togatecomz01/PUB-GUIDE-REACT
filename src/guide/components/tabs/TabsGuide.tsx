import { useState } from 'react';
import Tab from '../../../components/Tab/Tab.tsx';
import TabClip from '../../../components/TabClip/TabClip.tsx';
import { CodeBlock, PageTitle, PropTable, SourceFiles } from '../../ui/GuideUi.tsx';
import TabsUsageGuide from './TabsUsageGuide.tsx';
import ui from '../../ui/GuideUi.module.scss';
import styles from '../../ui/ControlGuide.module.scss';

export default function TabsGuide({ clip = false }: { clip?: boolean }) {
  const [count, setCount] = useState(clip ? 6 : 2);
  const [value, setValue] = useState('item-1');
  const [previewWidth, setPreviewWidth] = useState<'375px' | '100%'>('375px');
  const Component = clip ? TabClip : Tab;
  const name = clip ? 'TabClip' : 'Tab';
  const items = Array.from({ length: count }, (_, index) => ({
    value: `item-${index + 1}`,
    label: `메뉴 ${index + 1}`,
    content: <p className={styles.panel}>{index + 1}번 콘텐츠입니다.</p>,
  }));
  const code = `const [tab, setTab] = useState('first');\n\n<${name}\n  aria-label="${clip ? '하위 메뉴' : '화면 메뉴'}"\n  value={tab}\n  onValueChange={setTab}\n  items={[\n    { value: 'first', label: '첫 번째', content: <p>첫 번째 내용</p> },\n    { value: 'second', label: '두 번째', content: <p>두 번째 내용</p> },\n  ]}\n/>`;
  return (
    <>
      <PageTitle
        number={clip ? '11' : '10'}
        title={`<${name}>`}
        description={
          clip
            ? '라인형 Tab의 하위에 사용하는 2Depth 칩입니다. 텍스트 폭과 가로 스크롤을 유지합니다.'
            : '2·3개는 균등 분할하고 4개 이상은 94px 고정 폭으로 배치합니다.'
        }
        node={clip ? '405:3463' : '405:3230'}
      />
      <section className={ui.workbench} aria-label={`${name} 실행 예제`}>
        <div className={ui.liveStage}>
          <span className={ui.stageLabel}>직접 눌러보기</span>
          <div style={{ width: previewWidth, maxWidth: '100%' }}>
            <Component
              items={items}
              value={value}
              onValueChange={setValue}
              aria-label={`${name} 미리보기`}
            />
          </div>
          <p className={styles.status}>
            메뉴가 넘치면 메뉴 영역을 잡고 좌우로 드래그합니다. Shift+휠로도 이동할 수 있으며,
            방향키·Home·End로 선택하면 해당 메뉴가 보이게 이동합니다.
          </p>
        </div>
        <form className={ui.controls} onSubmit={(event) => event.preventDefault()}>
          <h2>미리보기 설정</h2>
          <label>
            항목 수
            <select
              aria-label="항목 수"
              value={count}
              onChange={(event) => {
                setCount(Number(event.target.value));
                setValue('item-1');
              }}
            >
              {[2, 3, 4, 6, 8].map((item) => (
                <option key={item} value={item}>
                  {item}개
                </option>
              ))}
            </select>
          </label>
          <label>
            미리보기 너비
            <select
              aria-label="미리보기 너비"
              value={previewWidth}
              onChange={(event) => setPreviewWidth(event.target.value as '375px' | '100%')}
            >
              <option value="375px">375px</option>
              <option value="100%">가용 영역 전체</option>
            </select>
          </label>
          <p className={styles.status} role="status">
            선택: {value}
          </p>
        </form>
      </section>
      <CodeBlock label={`<${name}> 사용 코드`} code={code} />
      <TabsUsageGuide clip={clip} />
      <details className={ui.disclosure}>
        <summary>사용 옵션과 키보드 동작</summary>
        <PropTable
          rows={[
            {
              name: 'items',
              type: 'TabItem[]',
              defaultValue: '필수',
              description: 'value(고유 값)·label·선택 content·disabled로 구성',
            },
            {
              name: 'value / defaultValue',
              type: 'string',
              defaultValue: '첫 번째 사용 가능한 항목',
              description:
                'value는 페이지가 관리할 선택값, defaultValue는 처음 선택할 값. 표시할 수 없는 값이면 첫 번째 사용 가능한 탭을 표시',
            },
            {
              name: 'onValueChange',
              type: '(value: string) => void',
              defaultValue: '생략',
              description: '선택 변경을 사용하는 화면으로 전달',
            },
            {
              name: 'aria-label',
              type: 'string',
              defaultValue: '필수',
              description: '탭 그룹의 화면 읽기 프로그램이 읽을 이름',
            },
            {
              name: 'className',
              type: 'string',
              defaultValue: '생략',
              description: '외부 폭·배치에 필요한 모듈 클래스',
            },
          ]}
        />
        <p className={ui.muted}>
          좌우 방향키·Home·End로 탭을 선택하면 해당 탭이 보이는 위치로 이동합니다. disabled 항목은
          건너뜁니다. content를 전달하면 tabpanel과 연결하고, 생략하면 onValueChange로 외부 화면을
          연결할 수 있습니다. TabClip은 Tab을 대체하는 최상위 메뉴가 아닙니다.
        </p>
        <p className={ui.muted}>
          PC 마우스로 메뉴 영역을 드래그하면 목록만 이동하며 탭 선택은 바뀌지 않습니다. 6px 이상
          가로로 이동했을 때 드래그로 구분하고, 짧게 클릭하면 해당 탭을 선택합니다. 터치는
          브라우저의 기본 가로 스와이프를 사용합니다.
        </p>
        <p className={ui.muted}>
          메뉴가 실제 영역보다 넓을 때만 grab 커서와 마우스 드래그를 사용합니다. 전부 들어가면 클릭
          가능한 메뉴에 pointer 커서를 표시합니다. 영역·항목·글꼴 크기 변화를 관찰해 갱신하며
          미디어쿼리의 화면 폭으로 판단하지 않습니다.
        </p>
        <SourceFiles
          files={[
            `src/components/${name}/${name}.tsx`,
            `src/components/${name}/${name}.module.scss`,
            'src/components/internal/TabList/TabList.tsx',
            'src/hooks/useHorizontalDrag.ts',
          ]}
        />
      </details>
    </>
  );
}
