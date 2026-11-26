export function tabPage(clip: boolean) {
  const name = clip ? 'TabClip' : 'Tab';
  const count = clip ? 6 : 3;
  const items = Array.from(
    { length: count },
    (_, index) =>
      `  {
    value: 'menu-${index + 1}',
    label: '메뉴 ${index + 1}',
    content: <p>메뉴 ${index + 1}의 내용입니다.</p>,
  },`,
  ).join('\n');
  return `import { useState } from 'react';
import ${name} from '../components/tabs/${name}/${name}.tsx';
import styles from './ExamplePage.module.scss';

const items = [
${items}
];

export default function ExamplePage() {
  const [selected, setSelected] = useState('menu-1');

  return (
    <${name}
      className={styles.tabs}
      aria-label="${clip ? '하위 메뉴' : '화면 메뉴'}"
      items={items}
      value={selected}
      onValueChange={setSelected}
    />
  );
}`;
}

export const tabPageStyles = `.tabs {
  width: 375px;
  max-width: 100%;
}`;

export function tabOptions(clip: boolean) {
  const name = clip ? 'TabClip' : 'Tab';
  return `<${name}
  aria-label="화면 메뉴"
  defaultValue="second"
  items={[
    { value: 'first', label: '첫 번째', content: <p>첫 번째 내용</p> },
    { value: 'second', label: '두 번째', content: <p>두 번째 내용</p> },
    { value: 'third', label: '준비 중', content: <p>준비 중인 내용</p>, disabled: true },
  ]}
/>`;
}

export const nestedTabs = `<Tab
  aria-label="서비스 구분"
  items={[
    {
      value: 'personal',
      label: '개인',
      content: (
        <TabClip
          aria-label="개인 서비스 메뉴"
          items={[
            { value: 'overview', label: '전체', content: <p>개인 서비스 전체</p> },
            { value: 'history', label: '이용 내역', content: <p>개인 서비스 이용 내역</p> },
          ]}
        />
      ),
    },
    {
      value: 'business',
      label: '기업',
      content: <p>기업 서비스 내용</p>,
    },
  ]}
/>`;
