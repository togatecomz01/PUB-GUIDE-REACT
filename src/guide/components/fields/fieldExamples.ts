import type { InputKind } from '../../../components/fields/TextField/TextField.tsx';

export const inputKinds: { kind: InputKind; label: string }[] = [
  { kind: 'basic', label: '이름' },
  { kind: 'price', label: '금액' },
  { kind: 'email', label: '이메일' },
  { kind: 'rrn', label: '주민등록번호' },
  { kind: 'phone', label: '휴대폰 번호' },
  { kind: 'code', label: '인증번호' },
];

export const labelCombinations = [
  { title: '레이블 + 입력 + 안내문구', label: true, help: true },
  { title: '입력 + 안내문구', label: false, help: true },
  { title: '레이블 + 입력', label: true, help: false },
  { title: '입력만', label: false, help: false },
];

export function fieldSnippet({
  search = false,
  kind = 'basic',
  variant,
  label = true,
  help = false,
}: {
  search?: boolean;
  kind?: InputKind;
  variant?: 'box' | 'line';
  label?: boolean;
  help?: boolean;
}) {
  const name = search ? 'SearchField' : 'TextField';
  const text = search ? '검색어' : inputKinds.find((item) => item.kind === kind)!.label;
  const helpText = search ? '검색할 단어를 입력해 주세요.' : `${text} 정보를 입력해 주세요.`;
  const props = [
    !search && `kind="${kind}"`,
    !search && variant && `variant="${variant}"`,
    `${label ? 'label' : 'aria-label'}=${JSON.stringify(text)}`,
    help && `helperText=${JSON.stringify(helpText)}`,
  ].filter(Boolean);
  return `<${name}\n${props.map((prop) => `  ${prop}`).join('\n')}\n/>`;
}

// src/pages/ExamplePage.tsx 위치를 기준으로 바로 사용할 수 있는 전체 파일입니다.
export const textFieldPage = `import { useState } from 'react';
import TextField from '../components/fields/TextField/TextField.tsx';

export default function ExamplePage() {
  const [email, setEmail] = useState('');

  return (
    <TextField
      kind="email"
      variant="box"
      label="이메일"
      helperText="안내받을 이메일을 입력해 주세요."
      value={email}
      onValueChange={setEmail}
    />
  );
}`;

export const searchFieldPage = `import { useState } from 'react';
import SearchField from '../components/fields/SearchField/SearchField.tsx';

export default function ExamplePage() {
  const [query, setQuery] = useState('');
  const [searchedQuery, setSearchedQuery] = useState('');

  function handleSearch(value: string) {
    setSearchedQuery(value);
  }

  return (
    <>
      <SearchField
        label="검색어"
        helperText="검색할 단어를 입력해 주세요."
        value={query}
        onValueChange={setQuery}
        onSearch={handleSearch}
      />
      <p role="status">검색한 단어: {searchedQuery || '없음'}</p>
    </>
  );
}`;
