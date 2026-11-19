import styles from './GuideUi.module.scss';
import { useId, useState } from 'react';
import { componentItems } from '../catalog/catalogData.ts';
import type { ReactNode } from 'react';
import { figmaLink } from '../colors/foundations.ts';

export function SourceLink({ node }: { node: string }) {
  return (
    <a className={styles.source} href={figmaLink(node)} target="_blank" rel="noreferrer">
      디자인 원본 ↗
    </a>
  );
}

export function PageTitle({
  title,
  description,
  node,
}: {
  number?: string;
  title: string;
  description: string;
  node?: string;
}) {
  const component = componentItems.find((item) => item.code === title.replace(/[<>]/g, ''));
  return (
    <header className={styles.title}>
      <p className={styles.eyebrow}>퍼블리싱 가이드</p>
      <h1>{component?.label ?? title}</h1>
      {component && <code className={styles.componentName}>{'<' + component.code + ' />'}</code>}
      <p>{component?.description ?? description}</p>
      {node && <SourceLink node={node} />}
    </header>
  );
}

export function CodeBlock({
  code,
  label = '사용 코드',
  language = 'TSX',
  compact = true,
}: {
  code: string;
  label?: string;
  language?: string;
  compact?: boolean;
}) {
  const [message, setMessage] = useState('');
  const [expanded, setExpanded] = useState(!compact);
  const id = useId();
  const fileLabel: Record<string, string> = {
    TSX: '화면 · TSX',
    TYPESCRIPT: '값·동작 · TS',
    TS: '값·동작 · TS',
    SCSS: '스타일 · SCSS',
    JSON: '설정 · JSON',
    TERMINAL: '실행 명령',
    TEXT: '파일 목록',
  };
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setMessage('복사했어요');
    } catch {
      setMessage('복사할 코드를 직접 선택해 주세요');
    }
  }
  return (
    <section className={styles.code} aria-label={label}>
      <header>
        <span>{label}</span>
        <span className={styles.codeActions}>
          <small>{fileLabel[language] ?? language}</small>
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={id}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? '코드 접기' : '코드 보기'}
          </button>
          <button type="button" onClick={copy}>
            코드 복사
          </button>
        </span>
      </header>
      <pre id={id} hidden={!expanded}>
        <code>{code}</code>
      </pre>
      <p className={styles.copyStatus} role="status">
        {message}
      </p>
    </section>
  );
}

function fileKind(file: string) {
  if (file.endsWith('.tsx')) return '화면 · TSX';
  if (file.endsWith('.ts')) return '값·동작 · TS';
  if (file.endsWith('.scss')) return '스타일 · SCSS';
  if (file.endsWith('.json')) return '설정 · JSON';
  return file.endsWith('/') || !file.split('/').at(-1)?.includes('.') ? '폴더' : '파일';
}
export function SourceFiles({ files }: { files: string[] }) {
  return (
    <details className={styles.disclosure}>
      <summary>사용하는 파일 위치</summary>
      <ul className={styles.fileEntries}>
        {files.map((file) => (
          <li key={file}>
            <span className={styles.fileKind}>{fileKind(file)}</span>
            <code>{file}</code>
          </li>
        ))}
      </ul>
    </details>
  );
}

export function PropTable({
  rows,
}: {
  rows: { name: string; type: string; defaultValue: string; description: string }[];
}) {
  return (
    <section className={styles.section}>
      <h2>바꿔 쓸 수 있는 값</h2>
      <div className={styles.tableWrap} tabIndex={0} aria-label="컴포넌트 옵션 표 가로 스크롤">
        <table className={[styles.table, styles.props].join(' ')}>
          <caption className={styles.sr}>컴포넌트 속성과 기본값</caption>
          <thead>
            <tr>
              <th scope="col">설정 항목</th>
              <th scope="col">쓸 수 있는 값</th>
              <th scope="col">기본값</th>
              <th scope="col">설명</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name}>
                <th scope="row">
                  <code>{row.name}</code>
                </th>
                <td>
                  <code>{row.type}</code>
                </td>
                <td>
                  <code>{row.defaultValue}</code>
                </td>
                <td>{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function PreviewStage({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div className={styles.staticPreview} role="img" aria-label={label}>
      <div inert>{children}</div>
    </div>
  );
}

export function CodeReadingGuide({
  note,
  sources,
}: {
  note: string;
  sources: { name: string; code: string }[];
}) {
  return (
    <details className={styles.disclosure}>
      <summary>컴포넌트 내부 코드 읽는 순서</summary>
      <p className={styles.muted}>
        전달받은 설정과 기본값 → 기억할 값과 HTML 요소(ref) → 표시할 조건 → 실행할 함수 → 화면
        구성(JSX) 순서로 읽습니다. 필요한 부분만 작성하고, 간단한 값 전달은 JSX 안에 그대로 둡니다.
      </p>
      <p className={styles.muted}>
        {note} 기존에 전달하던 설정(props)과 복사 예제는 그대로 사용합니다.
      </p>
      {sources.map((source) => (
        <CodeBlock key={source.name} label={source.name + ' · 현재 구현'} code={source.code} />
      ))}
    </details>
  );
}
