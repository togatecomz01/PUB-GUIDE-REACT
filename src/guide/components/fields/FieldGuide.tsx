import { useState } from 'react';
import TextField from '../../../components/TextField/TextField.tsx';
import type { InputKind } from '../../../components/TextField/TextField.tsx';
import SearchField from '../../../components/SearchField/SearchField.tsx';
import type { FieldState } from '../../../components/internal/FieldFrame/FieldFrame.tsx';
import { CodeBlock, PageTitle, PreviewStage, PropTable, SourceFiles } from '../../ui/GuideUi.tsx';
import FieldUsageGuide from './FieldUsageGuide.tsx';
import ui from '../../ui/GuideUi.module.scss';
import styles from '../../ui/ControlGuide.module.scss';

const kinds: InputKind[] = ['basic', 'price', 'email', 'rrn', 'phone', 'code'];
const exampleValues: Record<InputKind, string> = {
  basic: '입력된 텍스트입니다',
  price: '5,000,000',
  email: 'userid@naver.com',
  rrn: '' /* 앞6자리-뒤7자리 형식 */,
  phone: '010-12345678',
  code: '123456',
};
const sampleStates = ['inactive', 'focus', 'filled', 'error', 'success', 'disabled'] as const;

export default function FieldGuide({ search = false }: { search?: boolean }) {
  const [kind, setKind] = useState<InputKind>('basic');
  const [variant, setVariant] = useState<'box' | 'line'>('box');
  const [showLabel, setShowLabel] = useState(true);
  const [showHelp, setShowHelp] = useState(true);
  const [label, setLabel] = useState('레이블');
  const [helperText, setHelperText] = useState('안내 문구를 입력해 주세요');
  const [status, setStatus] = useState<FieldState>('default');
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [searchButton, setSearchButton] = useState(false);
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');
  const name = search ? 'SearchField' : 'TextField';
  const accessibleName = label.trim() || (search ? '검색어' : '입력값');
  const props = {
    label: showLabel && label ? label : undefined,
    'aria-label': accessibleName,
    helperText: showHelp ? helperText : undefined,
    status,
    disabled,
    readOnly,
    value,
    onValueChange: setValue,
  };
  const code = `<${name}${!search ? `\n  variant="${variant}"\n  kind="${kind}"` : searchButton ? '\n  searchButton' : ''}${showLabel && label ? `\n  label=${JSON.stringify(label)}` : `\n  aria-label=${JSON.stringify(accessibleName)}`}${showHelp && helperText ? `\n  helperText=${JSON.stringify(helperText)}` : ''}\n  value={value}\n  onValueChange={setValue}${status !== 'default' ? `\n  status="${status}"` : ''}${disabled ? '\n  disabled' : ''}${readOnly ? '\n  readOnly' : ''}${search ? '\n  onSearch={handleSearch}' : kind === 'phone' || kind === 'code' ? `\n  onAction={${kind === 'phone' ? 'requestCode' : 'extendTime'}}${kind === 'code' ? '\n  remainingTime="3:30"' : ''}` : ''}\n/>`;

  function changeKind(next: InputKind) {
    setKind(next);
    setValue('');
    setMessage('');
  }
  function changeStatus(next: FieldState) {
    setStatus(next);
    setHelperText(next === 'error' ? '오류 메시지를 입력해 주세요' : '안내 문구를 입력해 주세요');
  }
  function action() {
    setMessage(
      kind === 'phone'
        ? '요청 버튼에 연결한 함수를 실행했습니다. 인증 서버 연동는 연결하지 않았습니다.'
        : '시간연장 버튼에 연결한 함수를 실행했습니다. 타이머는 사용하는 화면에서 관리합니다.',
    );
  }

  return (
    <>
      <PageTitle
        number={search ? '13' : '12'}
        title={`<${name}>`}
        description={
          search
            ? '검색도 실제 input입니다. 검색·지우기 동작과 레이블·안내문구를 조합해서 사용합니다.'
            : '박스/라인과 내부 입력 구성을 각각 선택합니다. 생략한 레이블·안내문구는 빈 영역도 남기지 않습니다.'
        }
        node={search ? '444:905' : '408:12034'}
      />
      <section className={ui.workbench} aria-label={`${name} 실행 예제`}>
        <div className={ui.liveStage}>
          <span className={ui.stageLabel}>직접 눌러보기</span>
          <div className={styles.preview} data-demo-field>
            {search ? (
              <SearchField
                {...props}
                searchButton={searchButton}
                onSearch={(query) => setMessage(`검색 실행: ${query || '(빈 검색어)'}`)}
              />
            ) : (
              <TextField
                {...props}
                variant={variant}
                kind={kind}
                remainingTime={kind === 'code' ? '3:30' : undefined}
                onAction={action}
              />
            )}
          </div>
          <p className={styles.status} role="status">
            {message || '값을 입력하고 지우기·키보드 동작을 확인해 주세요.'}
          </p>
        </div>
        <form className={ui.controls} onSubmit={(event) => event.preventDefault()}>
          <h2>미리보기 설정</h2>
          {!search && (
            <>
              <label>
                스타일
                <select
                  aria-label="스타일"
                  value={variant}
                  onChange={(event) => setVariant(event.target.value as 'box' | 'line')}
                >
                  <option value="box">박스형</option>
                  <option value="line">밑줄형</option>
                </select>
              </label>
              <label>
                입력 구성
                <select
                  aria-label="입력 구성"
                  value={kind}
                  onChange={(event) => changeKind(event.target.value as InputKind)}
                >
                  {kinds.map((item) => (
                    <option key={item} value={item}>
                      {
                        {
                          basic: '일반 입력',
                          price: '금액',
                          email: '이메일',
                          rrn: '주민등록번호',
                          phone: '전화번호',
                          code: '인증번호',
                        }[item]
                      }
                    </option>
                  ))}
                </select>
              </label>
            </>
          )}
          <label className={ui.check}>
            <input
              type="checkbox"
              checked={showLabel}
              onChange={(event) => setShowLabel(event.target.checked)}
            />
            레이블 표시
          </label>
          <label>
            레이블 문구
            <input
              aria-label="레이블 문구"
              value={label}
              onChange={(event) => setLabel(event.target.value)}
            />
          </label>
          <label className={ui.check}>
            <input
              type="checkbox"
              checked={showHelp}
              onChange={(event) => setShowHelp(event.target.checked)}
            />
            안내문구 표시
          </label>
          <label>
            안내문구
            <input
              aria-label="안내문구 편집"
              value={helperText}
              onChange={(event) => setHelperText(event.target.value)}
            />
          </label>
          <label>
            상태
            <select
              aria-label="상태"
              value={status}
              onChange={(event) => changeStatus(event.target.value as FieldState)}
            >
              <option value="default">일반</option>
              <option value="error">오류</option>
              {!search && <option value="success">완료</option>}
            </select>
          </label>
          <label className={ui.check}>
            <input
              type="checkbox"
              checked={disabled}
              onChange={(event) => setDisabled(event.target.checked)}
            />
            비활성화
          </label>
          <label className={ui.check}>
            <input
              type="checkbox"
              checked={readOnly}
              onChange={(event) => setReadOnly(event.target.checked)}
            />
            읽기 전용
          </label>
          {search && (
            <label className={ui.check}>
              <input
                type="checkbox"
                checked={searchButton}
                onChange={(event) => setSearchButton(event.target.checked)}
              />
              오른쪽 검색 버튼
            </label>
          )}
          <button
            className={ui.action}
            type="button"
            onClick={() => setValue(search ? '입력된 텍스트입니다' : exampleValues[kind])}
          >
            예시 값 넣기
          </button>
        </form>
      </section>
      <CodeBlock label={`<${name}> 사용 코드`} code={code} />
      <p className={ui.muted}>
        이 코드는 컴포넌트 호출 부분입니다. value·setValue는 사용하는 화면의 useState로 준비하고,
        필요한 클릭·검색 시 실행할 함수를 연결합니다. 레이블을 생략하면 aria-label 같은 화면 읽기
        프로그램이 읽을 이름을 반드시 제공합니다.
      </p>
      <FieldUsageGuide search={search} />
      {!search && (
        <p className={ui.muted}>
          전화번호·인증번호의 보조 동작은 FormButton을 사용합니다. 다른 입력의 내부 버튼은
          endAdornment로, 입력 옆 배치는 페이지에서 지정합니다.{' '}
          <a href="#formbutton">FormButton 조합 예제 →</a> · 선택 입력은{' '}
          <a href="#selectfield">SelectField 예제 →</a>
        </p>
      )}
      <details className={ui.disclosure}>
        <summary>
          {search
            ? '레이블·안내문구 조합 4개 보기'
            : '박스/라인 × 입력 6종 × 레이블·안내문구 조합 48개 보기'}
        </summary>
        <div className={styles.gallery}>
          {(search ? (['box'] as const) : (['box', 'line'] as const)).flatMap((shape) =>
            (search ? (['basic'] as const) : kinds).flatMap((inputKind) =>
              [true, false].flatMap((hasLabel) =>
                [true, false].map((hasHelp) => {
                  const title = `${shape} · ${search ? 'search' : inputKind} · 레이블 ${hasLabel ? 'O' : 'X'} · 안내 ${hasHelp ? 'O' : 'X'}`;
                  const base = {
                    label: hasLabel ? '레이블' : undefined,
                    'aria-label': title,
                    helperText: hasHelp ? '안내 문구를 입력해 주세요' : undefined,
                    defaultValue: search ? '' : exampleValues[inputKind],
                  };
                  return (
                    <figure key={title} data-field-combination={title}>
                      <figcaption>{title}</figcaption>
                      <PreviewStage label={title}>
                        <div className={styles.preview}>
                          {search ? (
                            <SearchField {...base} />
                          ) : (
                            <TextField
                              {...base}
                              variant={shape}
                              kind={inputKind}
                              remainingTime={inputKind === 'code' ? '3:30' : undefined}
                            />
                          )}
                        </div>
                      </PreviewStage>
                    </figure>
                  );
                }),
              ),
            ),
          )}
        </div>
      </details>
      <details className={ui.disclosure}>
        <summary>Figma 상태 비교</summary>
        <div className={styles.gallery}>
          {(search ? (['box'] as const) : (['box', 'line'] as const)).flatMap((shape) =>
            sampleStates
              .filter((item) =>
                search
                  ? ['inactive', 'focus', 'filled', 'error'].includes(item)
                  : shape === 'line'
                    ? !['success', 'disabled'].includes(item)
                    : true,
              )
              .map((state) => {
                const title = `${shape} · ${state}`;
                const base = {
                  label: '레이블',
                  helperText:
                    state === 'error' ? '오류 메시지를 입력해 주세요' : '안내 문구를 입력해 주세요',
                  status: (state === 'error' || state === 'success'
                    ? state
                    : 'default') as FieldState,
                  disabled: state === 'disabled',
                  previewState: state === 'focus' ? ('focus' as const) : undefined,
                  defaultValue:
                    state === 'inactive'
                      ? ''
                      : state === 'focus'
                        ? '입력중입니다···'
                        : '입력된 텍스트입니다',
                };
                return (
                  <figure key={title}>
                    <figcaption>{title}</figcaption>
                    <PreviewStage label={title}>
                      <div className={styles.preview}>
                        {search ? (
                          <SearchField {...base} />
                        ) : (
                          <TextField {...base} variant={shape} />
                        )}
                      </div>
                    </PreviewStage>
                  </figure>
                );
              }),
          )}
        </div>
      </details>
      <details className={ui.disclosure}>
        <summary>사용 옵션과 값·동작 연결</summary>
        <PropTable
          rows={[
            ...(!search
              ? [
                  {
                    name: 'variant / kind',
                    type: 'box | line / basic | price | email | rrn | phone | code',
                    defaultValue: 'box / basic',
                    description: '외곽 스타일과 가운데 입력 구성을 독립적으로 선택',
                  },
                ]
              : []),
            {
              name: 'label / helperText',
              type: 'string / ReactNode',
              defaultValue: '생략',
              description: '생략하거나 빈 문자열이면 해당 태그와 여백을 만들지 않음',
            },
            {
              name: 'aria-label',
              type: 'string',
              defaultValue: '레이블 없을 때 필수',
              description: '보이는 레이블을 생략해도 입력 목적을 전달',
            },
            {
              name: 'value / defaultValue / onValueChange',
              type: 'string / string / (value: string) => void',
              defaultValue: '빈 문자열',
              description: 'value는 페이지에서 관리할 값, defaultValue는 컴포넌트가 관리할 처음 값',
            },
            {
              name: 'status / disabled / readOnly',
              type: 'default | error | success / boolean / boolean',
              defaultValue: 'default / false / false',
              description:
                '오류·완료 판정은 사용 화면에서 전달. 입력 값만 보고 성공을 추정하지 않음',
            },
            ...(search
              ? [
                  {
                    name: 'onSearch / searchButton',
                    type: '(value: string) => void / boolean',
                    defaultValue: '생략 / false',
                    description:
                      'Enter나 오른쪽 버튼으로 검색합니다. onSearch를 전달하면 Enter의 기본 폼 제출을 막습니다. 한글 등 글자 조합을 확정하는 Enter는 검색하지 않습니다.',
                  },
                ]
              : [
                  {
                    name: 'endAdornment',
                    type: 'ReactNode',
                    defaultValue: '생략',
                    description:
                      '입력 오른쪽에 추가할 버튼이나 내용. 추가 버튼의 disabled는 페이지에서 따로 전달',
                  },
                  {
                    name: 'emailDomains / phonePrefixes',
                    type: 'string[]',
                    defaultValue: "['naver.com'] / ['010']",
                    description: '프로젝트에서 선택 항목 제공. 이메일 도메인은 직접 입력 가능',
                  },
                  {
                    name: 'onAction / actionLabel / remainingTime',
                    type: '() => void / string / string',
                    defaultValue: '생략 / 요청 또는 시간연장 / 생략',
                    description:
                      '요청·연장 클릭과 표시할 남은 시간. 인증 서버 연동·타이머 자체는 포함하지 않음',
                  },
                ]),
            {
              name: 'className / id / name / ref',
              type: 'HTML·React 속성',
              defaultValue: '생략',
              description:
                'className으로 전체 폭·배치를 조정합니다. 이메일처럼 입력칸이 나뉘면 name은 합친 값을 담는 숨겨진 input에 연결하고, ref는 첫 입력칸을 가리킵니다.',
            },
          ]}
        />
        {!search && (
          <CodeBlock
            label="kind별 value 예시"
            language="TYPESCRIPT"
            code={`basic: '입력된 텍스트입니다'\nprice: '5,000,000'\nemail: 'userid@naver.com'\nrrn: '' /* 앞6자리-뒤7자리 형식 */\nphone: '010-12345678'\ncode: '123456'`}
          />
        )}
        <p className={ui.muted}>
          {search
            ? 'SearchField는 검색 아이콘과 입력값 지우기 버튼을 제공합니다. searchButton을 넣으면 오른쪽 검색 버튼이 생깁니다. 검색 실행과 결과 화면 이동은 onSearch에 연결합니다.'
            : 'price는 우측 정렬과 단위를 제공하며 금액 표시 형식·계산은 화면에서 처리합니다. email·rrn·phone은 구분자를 포함한 문자열로 값을 주고받습니다. RRN은 앞 6자리와 뒤 7자리로 구성하며 뒤 첫 숫자 다음은 기본 password 입력칸으로 가려서 표시합니다. 첫 숫자 입력 후 나머지 입력으로 이동합니다. 숫자 제한·표현 외에 유효성 판정이나 인증을 임의로 추가하지 않습니다.'}
        </p>
        <p className={ui.muted}>
          컴포넌트 외곽에는 페이지 좌우 여백을 넣지 않습니다. Figma 375px 중 좌우 24px 여백은 가이드
          미리보기 영역에만 두며 실제 필드는 327px입니다. 레이블·안내문구 조합 높이는 122 / 88 / 88
          / 54px입니다. Pretendard·글자 크기·행간·자간·치수는 이 컴포넌트의 표현값이며 보류 중인
          전역 Typography·치수 토큰을 채택한 것은 아닙니다.
        </p>
        <SourceFiles
          files={[
            `src/components/${name}/${name}.tsx`,
            `src/components/${name}/${name}.module.scss`,
            'src/components/internal/FieldFrame/FieldFrame.tsx',
          ]}
        />
      </details>
    </>
  );
}
