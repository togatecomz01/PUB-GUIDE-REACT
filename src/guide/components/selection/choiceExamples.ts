export type ChoiceKind = 'checkbox' | 'radio' | 'switch';

export const choiceNames = {
  checkbox: 'Checkbox',
  radio: 'Radio',
  switch: 'Switch',
} as const;

export function choicePage(kind: ChoiceKind) {
  if (kind === 'radio') {
    return `import { useId, useState } from 'react';
import Radio from '../components/Radio/Radio.tsx';

export default function ExamplePage() {
  const groupName = useId();
  const [method, setMethod] = useState('email');

  return (
    <fieldset>
      <legend>연락 방법</legend>
      <Radio
        name={groupName}
        value="email"
        label="이메일"
        checked={method === 'email'}
        onChange={(event) => setMethod(event.target.value)}
      />
      <Radio
        name={groupName}
        value="sms"
        label="문자"
        checked={method === 'sms'}
        onChange={(event) => setMethod(event.target.value)}
      />
      <p role="status">선택: {method === 'email' ? '이메일' : '문자'}</p>
    </fieldset>
  );
}`;
  }
  const name = choiceNames[kind];
  const state = kind === 'checkbox' ? 'agreed' : 'notifications';
  const setter = kind === 'checkbox' ? 'setAgreed' : 'setNotifications';
  const label = kind === 'checkbox' ? '이용약관 동의' : '알림 사용';
  return `import { useState } from 'react';
import ${name} from '../components/${name}/${name}.tsx';

export default function ExamplePage() {
  const [${state}, ${setter}] = useState(false);

  return (
    <section aria-label="${label}">
      <${name}
        label="${label}"
        checked={${state}}
        onChange={(event) => ${setter}(event.target.checked)}
      />
      <p role="status">{${state} ? '켜짐' : '꺼짐'}</p>
    </section>
  );
}`;
}

export function choiceStyles(kind: ChoiceKind) {
  const name = choiceNames[kind];
  return (kind === 'checkbox' ? ['square', 'line', 'box'] : [undefined]).flatMap((variant) =>
    (['s', 'm'] as const).map((size) => ({
      title: `${variant ? `${variant} · ` : ''}${size.toUpperCase()}`,
      code: `<${name}
  size="${size}"${variant ? `\n  variant="${variant}"` : ''}
  label="선택 항목"${kind === 'radio' ? '\n  name="style-choice"\n  value="first"' : ''}
/>`,
    })),
  );
}

export function choiceOptions(kind: ChoiceKind) {
  const name = choiceNames[kind];
  const group = kind === 'radio' ? '\n  name="option-choice"\n  value="first"' : '';
  return [
    { title: '레이블 표시', code: `<${name}\n  label="선택 항목"${group}\n/>` },
    { title: '레이블 생략', code: `<${name}\n  aria-label="선택 항목"${group}\n/>` },
    { title: '처음부터 선택', code: `<${name}\n  label="선택 항목"${group}\n  defaultChecked\n/>` },
    {
      title: '선택된 상태로 비활성화',
      code: `<${name}\n  label="선택 항목"${group}\n  defaultChecked\n  disabled\n/>`,
    },
  ];
}

export const checkboxGroupPage = `import { useId, useState } from 'react';
import Checkbox from '../components/Checkbox/Checkbox.tsx';

const options = [
  { value: 'email', label: '이메일' },
  { value: 'sms', label: '문자' },
];

export default function ExamplePage() {
  const groupName = useId();
  const [selected, setSelected] = useState<string[]>([]);

  function changeOption(value: string, checked: boolean) {
    setSelected((current) =>
      checked ? [...current, value] : current.filter((item) => item !== value),
    );
  }

  return (
    <fieldset>
      <legend>알림 수신 방법 · 복수 선택</legend>
      {options.map((option) => (
        <Checkbox
          key={option.value}
          name={groupName}
          value={option.value}
          label={option.label}
          checked={selected.includes(option.value)}
          onChange={(event) => changeOption(option.value, event.target.checked)}
        />
      ))}
      <p role="status">선택 값: {selected.join(', ') || '없음'}</p>
    </fieldset>
  );
}`;
