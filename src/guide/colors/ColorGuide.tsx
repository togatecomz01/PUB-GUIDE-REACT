import styles from '../ui/GuideUi.module.scss';
import { useState } from 'react';
import { baseColors, semanticColors, semanticGroups } from './foundations.ts';
import type { ColorToken } from './foundations.ts';
import { CodeBlock, PageTitle, SourceFiles } from '../ui/GuideUi.tsx';

const shortName = (token: ColorToken) => token.variable.slice(2);
const formatValue = (value: string) =>
  value.startsWith('#') ? value.toUpperCase() : 'rgba(0, 0, 0, 0.2)';

function TokenCopyButton({
  token,
  copied,
  onCopy,
}: {
  token: ColorToken;
  copied: string;
  onCopy: (token: ColorToken) => Promise<void>;
}) {
  return (
    <button
      className={styles.tokenCopy}
      type="button"
      onClick={() => void onCopy(token)}
      aria-label={`${shortName(token)} CSS 복사`}
    >
      <code>var({token.variable})</code>
      <span>{copied === token.variable ? '복사됨' : '복사'}</span>
    </button>
  );
}

export default function ColorGuide({ semantic = false }: { semantic?: boolean }) {
  const [query, setQuery] = useState('');
  const [showFigma, setShowFigma] = useState(false);
  const [copied, setCopied] = useState('');
  const [copyError, setCopyError] = useState('');
  const tokens = semantic ? semanticColors : baseColors;
  const groups = semantic ? semanticGroups : ['Brand', 'Gray', 'Other'];
  const filtered = tokens.filter((token) =>
    `${token.variable} ${token.value} ${token.name} ${token.alias ?? ''}`
      .toLowerCase()
      .includes(query.toLowerCase().trim()),
  );
  async function copy(token: ColorToken) {
    try {
      await navigator.clipboard.writeText(`var(${token.variable})`);
      setCopied(token.variable);
      setCopyError('');
    } catch {
      setCopyError('복사할 변수 표현을 직접 선택해 주세요.');
    }
  }
  return (
    <>
      <PageTitle
        number={semantic ? '04' : '03'}
        title={semantic ? '역할별 색상' : '기본 색상'}
        description={
          semantic
            ? '글자·배경·테두리 등 사용하는 곳에 맞는 색상 변수를 골라 쓰세요.'
            : '코드에 등록한 기본 색상 목록입니다. --gray-500처럼 짧은 이름을 정하고, 역할별 색상에서 이 변수를 사용합니다.'
        }
        node={semantic ? '38:23' : '38:22'}
      />
      <div className={styles.callout}>
        <strong>
          {semantic ? 'text-default → gray-800 → #383838' : 'Base/Gray/500 → gray-500'}
        </strong>
        <p>
          {semantic
            ? '역할별 변수는 기본 색상 변수를 통해 실제 색을 가져옵니다. 현재 색이 같아도 글자·배경 등 용도가 다르면 이름을 따로 둡니다.'
            : 'Figma 경로를 CSS 이름으로 그대로 사용하지 않습니다. color 접두사 없이 --gray-500으로 정의합니다.'}
        </p>
      </div>
      <div className={styles.toolbar}>
        <label className={styles.search}>
          <span>변수 검색</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="이름 · 색상값 · Figma 이름"
          />
        </label>
        <label className={styles.check}>
          <input
            type="checkbox"
            checked={showFigma}
            onChange={(event) => setShowFigma(event.target.checked)}
          />{' '}
          Figma 이름 함께 보기
        </label>
        <span className={styles.result}>
          {filtered.length} / {tokens.length}개
        </span>
      </div>
      <p className={styles.sr} role="status">
        {copied ? `${copied} 변수 표현을 복사했습니다.` : ''}
        {copyError}
      </p>
      {filtered.length === 0 && (
        <p className={styles.empty}>
          검색 결과가 없습니다. 다른 변수명이나 색상값으로 검색해 주세요.
        </p>
      )}
      {groups.map((group) => {
        const items = filtered.filter((token) => token.group === group);
        if (!items.length) return null;
        return (
          <section className={styles.colorGroup} key={group}>
            <header className={styles.subhead}>
              <h2>{group}</h2>
              <span>{items.length}개 등록</span>
            </header>
            {semantic ? (
              <div
                className={styles.tableWrap}
                tabIndex={0}
                aria-label={`${group} 색상 표 가로 스크롤`}
              >
                <table className={[styles.table, styles.colorTable].join(' ')}>
                  <caption className={styles.sr}>{group} 코드 변수와 기본 색상 참조</caption>
                  <thead>
                    <tr>
                      <th scope="col">미리보기</th>
                      <th scope="col">코드 이름</th>
                      <th scope="col">참조하는 기본 변수</th>
                      <th scope="col">CSS 사용</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((token) => (
                      <tr key={token.variable}>
                        <td>
                          <span
                            className={styles.colorChip}
                            style={{ background: `var(${token.variable})` }}
                          />
                        </td>
                        <th scope="row">
                          <code>{shortName(token)}</code>
                          {showFigma && <small>{token.name}</small>}
                        </th>
                        <td>
                          <code>{token.value}</code>
                        </td>
                        <td>
                          <TokenCopyButton token={token} copied={copied} onCopy={copy} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <ul className={styles.palette}>
                {items.map((token) => (
                  <li key={token.variable}>
                    <span
                      className={styles.swatch}
                      style={{ background: `var(${token.variable})` }}
                    />
                    <strong>
                      <code>{shortName(token)}</code>
                    </strong>
                    <span className={styles.colorValue}>{formatValue(token.value)}</span>
                    {showFigma && <small className={styles.figmaName}>{token.name}</small>}
                    <TokenCopyButton token={token} copied={copied} onCopy={copy} />
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}
      <CodeBlock
        language="SCSS"
        label={semantic ? '컴포넌트에서 사용하기' : '기본 변수와 역할별 변수의 연결'}
        code={
          semantic
            ? `.message {\n  color: var(--text-default);\n  background: var(--bg-surface);\n  border: 1px solid var(--border-default);\n}`
            : `:root {\n  --gray-500: #787878;\n  --gray-800: #383838;\n  --text-default: var(--gray-800);\n}\n\n.message {\n  color: var(--text-default);\n}`
        }
      />
      <SourceFiles
        files={
          semantic
            ? ['src/styles/tokens/_semantic.scss']
            : ['src/styles/tokens/_primitives.scss', 'src/styles/tokens/_semantic.scss']
        }
      />
    </>
  );
}
