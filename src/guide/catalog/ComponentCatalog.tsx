import { useState } from 'react';
import Button from '../../components/buttons/Button/Button.tsx';
import FormButton from '../../components/buttons/FormButton/FormButton.tsx';
import TextButton from '../../components/buttons/TextButton/TextButton.tsx';
import Badge from '../../components/Badge/Badge.tsx';
import Checkbox from '../../components/selection/Checkbox/Checkbox.tsx';
import Radio from '../../components/selection/Radio/Radio.tsx';
import Switch from '../../components/selection/Switch/Switch.tsx';
import TextField from '../../components/fields/TextField/TextField.tsx';
import SearchField from '../../components/fields/SearchField/SearchField.tsx';
import SelectField from '../../components/fields/SelectField/SelectField.tsx';
import Tab from '../../components/tabs/Tab/Tab.tsx';
import TabClip from '../../components/tabs/TabClip/TabClip.tsx';
import Icon from '../../components/Icon/Icon.tsx';
import { componentItems, componentGroups } from './catalogData.ts';
import { PageTitle } from '../ui/GuideUi.tsx';
import styles from './ComponentCatalog.module.scss';

function Sample({ id }: { id: string }) {
  const items = [
    { value: 'one', label: '메뉴 1' },
    { value: 'two', label: '메뉴 2' },
  ];
  if (id === 'button') return <Button size="m">확인</Button>;
  if (id === 'formbutton') return <FormButton>입력 확인</FormButton>;
  if (id === 'textbutton') return <TextButton appearance="arrow">자세히 보기</TextButton>;
  if (id === 'checkbox') return <Checkbox defaultChecked label="체크 항목" />;
  if (id === 'radio') return <Radio defaultChecked label="선택 항목" />;
  if (id === 'switch') return <Switch defaultChecked aria-label="알림 사용" />;
  if (id === 'textfield')
    return <TextField aria-label="입력창 예시" placeholder="내용을 입력하세요" />;
  if (id === 'searchfield')
    return <SearchField aria-label="검색창 예시" placeholder="검색어 입력" />;
  if (id === 'selectfield')
    return (
      <SelectField aria-label="선택창 예시" options={[{ value: 'one', label: '선택 항목' }]} />
    );
  if (id === 'tab') return <Tab items={items} aria-label="탭 예시" />;
  if (id === 'tabclip') return <TabClip items={items} aria-label="칩 탭 예시" />;
  if (id === 'badge')
    return (
      <Badge variant="fill" tone="brand-weak">
        신규
      </Badge>
    );
  if (id === 'icon')
    return (
      <div className={styles.iconRow}>
        <Icon name="search" />
        <Icon name="check" />
        <Icon name="close" />
      </div>
    );
  return (
    <Icon
      name={
        id === 'keypad'
          ? 'more_horizontal'
          : id === 'accordion'
            ? 'chevron_down'
            : id === 'header'
              ? 'menu'
              : id === 'tooltip'
                ? 'help_circle'
                : 'list'
      }
      size={32}
    />
  );
}
export default function ComponentCatalog() {
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState<string>('전체');
  const items = componentItems.filter(
    (item) =>
      (group === '전체' || item.group === group) &&
      (item.label + ' ' + item.code + ' ' + item.description)
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  return (
    <>
      <PageTitle
        number=""
        title="컴포넌트"
        description="필요한 UI를 골라 모양을 확인하고 코드를 복사하세요."
      />
      <div className={styles.toolbar}>
        <label className={styles.search}>
          찾기
          <input
            type="search"
            placeholder="버튼, 입력창, Modal…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <span role="status">{items.length}개</span>
      </div>
      <div className={styles.filters} role="group" aria-label="컴포넌트 종류">
        {componentGroups.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={group === item}
            onClick={() => setGroup(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className={styles.grid}>
        {items.map((item) => (
          <article key={item.id} className={styles.card}>
            <div className={styles.sample} inert aria-hidden="true">
              <Sample id={item.id} />
            </div>
            <a href={'#' + item.id}>
              <strong>{item.label}</strong>
              <code>{item.code}</code>
              <span aria-hidden="true">↗</span>
            </a>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
      {items.length === 0 && <p>검색 결과가 없습니다. 다른 이름으로 찾아보세요.</p>}
      <details className={styles.reference}>
        <summary>색상이 필요할 때</summary>
        <a href="#color-base">기본 색상 보기</a>
        <a href="#color-semantic">용도별 색상 보기</a>
      </details>
    </>
  );
}
