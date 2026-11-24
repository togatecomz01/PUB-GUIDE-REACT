import componentSource from '../../../components/Button/Button.tsx?raw';
import styles from '../../ui/GuideUi.module.scss';
import { useState } from 'react';
import Button from '../../../components/Button/Button.tsx';
import type { ButtonSize, ButtonVariant } from '../../../components/Button/Button.tsx';
import {
  CodeReadingGuide,
  CodeBlock,
  PageTitle,
  PropTable,
  SourceFiles,
} from '../../ui/GuideUi.tsx';
import { createButtonExample } from '../../ui/codeExamples.ts';

const roles: ButtonVariant[] = ['primary', 'secondary', 'tertiary'];
const sizes: ButtonSize[] = ['l', 'm', 's'];
const states = ['Default', 'Pressed', 'Disabled'] as const;
const roleName = (name: string) =>
  (
    ({ primary: '주요 버튼', secondary: '보조 버튼', tertiary: '기본 버튼' }) as Record<
      string,
      string
    >
  )[name] ?? name;

export function ButtonGuide() {
  const [variant, setVariant] = useState<ButtonVariant>('primary');
  const [size, setSize] = useState<ButtonSize>('l');
  const [label, setLabel] = useState('확인');
  const [disabled, setDisabled] = useState(false);
  const [clicks, setClicks] = useState(0);
  const { code, fullCode } = createButtonExample({ variant, size, label, disabled });

  return (
    <>
      <PageTitle
        number="05"
        title="<Button>"
        description="종류·크기·상태를 선택하고 컴포넌트 코드를 사용하세요."
        node="288:1094"
      />
      <div className={styles.componentMeta}>
        <span className={[styles.status, styles.statusReady].join(' ')}>구현 초안</span>
        <code>Button.tsx</code>
        <span>
          종류·크기·사용 가능 여부를 바꿔 보세요. 긴 텍스트는 버튼 폭에 맞춰 말줄임됩니다.
        </span>
      </div>
      <section className={styles.workbench} aria-label="버튼 실행 예제">
        <div className={styles.liveStage}>
          <span className={styles.stageLabel}>직접 눌러보기</span>
          <Button
            variant={variant}
            size={size}
            disabled={disabled}
            onClick={() => setClicks((value) => value + 1)}
          >
            {label}
          </Button>
          <p className={styles.liveMessage} role="status">
            {clicks ? `버튼 클릭 ${clicks}회 확인` : '버튼을 눌러 동작을 확인하세요'}
          </p>
        </div>
        <form className={styles.controls} onSubmit={(event) => event.preventDefault()}>
          <h2>미리보기 설정</h2>
          <label>
            종류
            <select
              aria-label="종류"
              value={variant}
              onChange={(event) => setVariant(event.target.value as ButtonVariant)}
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {roleName(role)}
                </option>
              ))}
            </select>
          </label>
          <label>
            크기
            <select
              aria-label="크기"
              value={size}
              onChange={(event) => setSize(event.target.value as ButtonSize)}
            >
              {sizes.map((item) => (
                <option key={item} value={item}>
                  {item.toUpperCase()} · {item === 'l' ? 52 : item === 'm' ? 48 : 42}px
                </option>
              ))}
            </select>
          </label>
          <label>
            문구
            <input value={label} onChange={(event) => setLabel(event.target.value)} />
          </label>
          <label className={styles.check}>
            <input
              type="checkbox"
              checked={disabled}
              onChange={(event) => setDisabled(event.target.checked)}
            />{' '}
            비활성화 (disabled)
          </label>
        </form>
      </section>
      <CodeBlock label="<Button> 사용 코드" code={code} />
      <CodeReadingGuide
        note="cx는 버튼 종류·크기·추가 클래스만 합칩니다. 클릭이나 폼 전송은 전달한 기본 button 속성대로 동작합니다."
        sources={[{ name: 'Button.tsx', code: componentSource }]}
      />
      <details className={styles.disclosure}>
        <summary>전체 예제와 실행 방법</summary>
        <p className={styles.muted}>
          이 저장소에서 확인하려면 <code>src/pages/ButtonExample.tsx</code>를 만들고 아래 전체
          코드를 붙여 넣으세요. <code>src/App.tsx</code>에{' '}
          <code>import ButtonExample from './pages/ButtonExample.tsx';</code>를 추가하고, App의
          반환을 잠시 <code>return &lt;ButtonExample /&gt;;</code>로 바꿉니다.{' '}
          <code>npm run dev</code>를 실행한 뒤 터미널에 표시된 주소를 열면 버튼이 보입니다. 확인을
          마치면 App.tsx를 원래대로 되돌리세요.
        </p>
        <CodeBlock label="Button 전체 예제" code={fullCode} />
      </details>
      <details className={styles.disclosure}>
        <summary>전체 상태 27개 보기</summary>
        <section className={styles.section}>
          <header className={styles.subhead}>
            <h2>전체 상태 비교</h2>
            <span>Figma의 27개 조합</span>
          </header>
          <p className={styles.muted}>
            Pressed 행은 가이드에서만 눌린 모양을 고정합니다. 업무 화면에서는 실제 누름 동작으로
            표시됩니다.
          </p>
          <div className={styles.tableWrap} tabIndex={0} aria-label="버튼 상태 표 가로 스크롤">
            <table className={styles.buttonMatrix}>
              <caption className={styles.sr}>버튼 27개 조합</caption>
              <thead>
                <tr>
                  <th rowSpan={2} scope="col">
                    상태
                  </th>
                  {roles.map((role) => (
                    <th key={role} colSpan={3} scope="colgroup">
                      {roleName(role)}
                    </th>
                  ))}
                </tr>
                <tr>
                  {roles.flatMap((role) =>
                    sizes.map((item) => (
                      <th key={`${role}-${item}`} scope="col">
                        {item.toUpperCase()}
                      </th>
                    )),
                  )}
                </tr>
              </thead>
              <tbody>
                {states.map((state) => (
                  <tr key={state}>
                    <th scope="row">{state}</th>
                    {roles.flatMap((role) =>
                      sizes.map((item) => (
                        <td key={`${role}-${item}`}>
                          <Button
                            variant={role}
                            size={item}
                            disabled={state === 'Disabled'}
                            previewState={state === 'Pressed' ? 'pressed' : undefined}
                            aria-label={`${roleName(role)} ${item.toUpperCase()} ${state}`}
                          >
                            버튼
                          </Button>
                        </td>
                      )),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </details>
      <details className={styles.disclosure}>
        <summary>사용 옵션과 적용 기준</summary>
        <PropTable
          rows={[
            {
              name: 'variant',
              type: 'primary | secondary | tertiary',
              defaultValue: 'primary',
              description: '버튼의 디자인 종류',
            },
            {
              name: 'size',
              type: 'l | m | s',
              defaultValue: 'l',
              description: '높이 52 · 48 · 42px. 너비는 문구와 좌우 여백에 맞춰 늘어납니다.',
            },
            {
              name: 'disabled',
              type: 'boolean',
              defaultValue: 'false',
              description: '기본 button의 비활성화 속성',
            },
            {
              name: 'className',
              type: 'string',
              defaultValue: '생략',
              description:
                '사용하는 화면의 CSS Module 클래스를 전달. 내부 클래스명은 직접 참조하지 않습니다.',
            },
            {
              name: 'children',
              type: 'ReactNode',
              defaultValue: '버튼',
              description: '표시할 문구',
            },
            {
              name: 'onClick',
              type: '버튼 클릭 이벤트',
              defaultValue: '—',
              description: '연결할 동작은 사용하는 화면에서 전달',
            },
          ]}
        />
        <div className={styles.callout}>
          <strong>제품 컴포넌트의 표현값을 유지합니다</strong>
          <p>
            L은 18/28px, M은 16/24px, S는 14/22px입니다. 이 값은 Button 내부 SCSS이며 전역
            타이포그래피 토큰이 아닙니다. type은 기본 button이고, submit이 필요하면 명시합니다. 화면
            전용 스타일은 className으로 전달하며 작성 방법은 스타일 작성 메뉴에서 확인합니다.
          </p>
        </div>
        <SourceFiles
          files={[
            'src/components/Button/Button.tsx',
            'src/components/Button/Button.module.scss',
            'src/utils/cx.ts',
          ]}
        />
      </details>
    </>
  );
}
