import type { ButtonSize, ButtonVariant } from '../../components/Button/Button.tsx';
import type { DialogActionLayout, DialogKind } from '../../components/Modal/Modal.tsx';

type ButtonExampleOptions = {
  variant: ButtonVariant;
  size: ButtonSize;
  label: string;
  disabled: boolean;
};

type ModalExampleOptions = {
  kind: DialogKind;
  layout: DialogActionLayout;
  title: string;
  description?: string;
};

// 입력 문구에 JSX 기호가 있어도 복사한 예제가 올바르게 동작하도록 처리합니다.
function jsxAttribute(value: string) {
  return /["&<>\r\n\t]/.test(value) ? '{' + JSON.stringify(value) + '}' : '"' + value + '"';
}

function jsxText(value: string) {
  const canUsePlainText =
    value.length > 0 && value === value.trim() && !/[<>{}&\r\n\t]| {2}/.test(value);

  return canUsePlainText ? value : '{' + JSON.stringify(value) + '}';
}

function indent(code: string, spaces: number) {
  const prefix = ' '.repeat(spaces);
  return code
    .split('\n')
    .map((line) => prefix + line)
    .join('\n');
}

export function createButtonExample({ variant, size, label, disabled }: ButtonExampleOptions) {
  const code = [
    `<Button variant="${variant}" size="${size}"${disabled ? ' disabled' : ''}>`,
    `  ${jsxText(label)}`,
    '</Button>',
  ].join('\n');

  const fullCode = [
    "import Button from '../components/Button/Button.tsx';",
    '',
    'export default function Example() {',
    '  return (',
    indent(code, 4),
    '  );',
    '}',
  ].join('\n');

  return { code, fullCode };
}

export function createModalExample({ kind, layout, title, description }: ModalExampleOptions) {
  const code = [
    '<Modal',
    '  open={open}',
    `  kind="${kind}"`,
    ...(kind === 'confirm' && layout === 'vertical' ? ['  layout="vertical"'] : []),
    `  title=${jsxAttribute(title)}`,
    ...(description !== undefined ? [`  description=${jsxAttribute(description)}`] : []),
    '  onClose={closeModal}',
    '/>',
  ].join('\n');

  const fullCode = [
    "import { useState } from 'react';",
    "import Modal from '../components/Modal/Modal.tsx';",
    '',
    'export default function Example() {',
    '  const [open, setOpen] = useState(false);',
    '  const closeModal = () => setOpen(false);',
    '',
    '  return (',
    '    <>',
    '      <button type="button" onClick={() => setOpen(true)}>열기</button>',
    indent(code, 6),
    '    </>',
    '  );',
    '}',
  ].join('\n');

  return { code, fullCode };
}
