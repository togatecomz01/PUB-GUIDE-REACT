import { useId, useState } from 'react';
import Checkbox from '../../../components/selection/Checkbox/Checkbox.tsx';
import Radio from '../../../components/selection/Radio/Radio.tsx';
import Switch from '../../../components/selection/Switch/Switch.tsx';
import { CodeBlock, PageTitle, PreviewStage, PropTable, SourceFiles } from '../../ui/GuideUi.tsx';
import ChoiceUsageGuide from './ChoiceUsageGuide.tsx';
import ui from '../../ui/GuideUi.module.scss';
import styles from '../../ui/ControlGuide.module.scss';

type ChoiceKind = 'checkbox' | 'radio' | 'switch';
const definitions = {
  checkbox: { name: 'Checkbox', node: '402:2961', number: '07' },
  radio: { name: 'Radio', node: '402:3762', number: '08' },
  switch: { name: 'Switch', node: '404:1500', number: '09' },
};

export default function ChoiceGuide({ kind }: { kind: ChoiceKind }) {
  const definition = definitions[kind];
  const groupId = useId();
  const [size, setSize] = useState<'s' | 'm'>(kind === 'switch' ? 'm' : 's');
  const [variant, setVariant] = useState<'square' | 'line' | 'box'>('square');
  const [disabled, setDisabled] = useState(false);
  const [showLabel, setShowLabel] = useState(true);
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('first');
  const label = kind === 'checkbox' ? '체크 항목' : kind === 'switch' ? '알림 사용' : '선택 항목';
  const code = `<${definition.name}\n  size="${size}"${kind === 'checkbox' ? `\n  variant="${variant}"` : ''}\n  ${showLabel ? `label=${JSON.stringify(label)}` : `aria-label=${JSON.stringify(label)}`}${disabled ? '\n  disabled' : ''}${kind === 'radio' ? '\n  name="choice"\n  value="first"' : ''}\n/>`;
  const variants = kind === 'checkbox' ? (['square', 'line', 'box'] as const) : [undefined];
  return (
    <>
      <PageTitle
        number={definition.number}
        title={`<${definition.name}>`}
        description="기본 input의 선택·키보드·disabled 동작을 유지하는 퍼블리싱 컴포넌트입니다."
        node={definition.node}
      />
      <section className={ui.workbench} aria-label={`${definition.name} 실행 예제`}>
        <div className={ui.liveStage}>
          <span className={ui.stageLabel}>직접 눌러보기</span>
          <div className={kind === 'radio' ? styles.radioChoices : styles.choices}>
            {kind === 'checkbox' && (
              <Checkbox
                size={size}
                variant={variant}
                disabled={disabled}
                label={showLabel ? label : undefined}
                aria-label={label}
                checked={checked}
                onChange={(event) => setChecked(event.target.checked)}
              />
            )}
            {kind === 'switch' && (
              <Switch
                size={size}
                disabled={disabled}
                label={showLabel ? label : undefined}
                aria-label={label}
                checked={checked}
                onChange={(event) => setChecked(event.target.checked)}
              />
            )}
            {kind === 'radio' &&
              ['first', 'second'].map((value, index) => (
                <Radio
                  key={value}
                  name={groupId}
                  value={value}
                  size={size}
                  disabled={disabled}
                  label={showLabel ? `선택 항목 ${index + 1}` : undefined}
                  aria-label={`선택 항목 ${index + 1}`}
                  checked={radioValue === value}
                  onChange={() => setRadioValue(value)}
                />
              ))}
          </div>
          <p className={styles.status} role="status">
            {kind === 'radio'
              ? `선택: ${radioValue === 'first' ? '첫 번째' : '두 번째'}`
              : `선택: ${checked ? '켜짐' : '꺼짐'}`}
          </p>
        </div>
        <form className={ui.controls} onSubmit={(event) => event.preventDefault()}>
          <h2>미리보기 설정</h2>
          <label>
            크기
            <select
              aria-label="크기"
              value={size}
              onChange={(event) => setSize(event.target.value as 's' | 'm')}
            >
              <option value="s">S</option>
              <option value="m">M</option>
            </select>
          </label>
          {kind === 'checkbox' && (
            <label>
              종류
              <select
                aria-label="종류"
                value={variant}
                onChange={(event) => setVariant(event.target.value as typeof variant)}
              >
                <option value="square">사각형</option>
                <option value="line">체크 표시</option>
                <option value="box">박스형</option>
              </select>
            </label>
          )}
          <label className={ui.check}>
            <input
              type="checkbox"
              checked={showLabel}
              onChange={(event) => setShowLabel(event.target.checked)}
            />
            레이블 표시
          </label>
          <label className={ui.check}>
            <input
              type="checkbox"
              checked={disabled}
              onChange={(event) => setDisabled(event.target.checked)}
            />
            비활성화
          </label>
        </form>
      </section>
      <CodeBlock label={`<${definition.name}> 사용 코드`} code={code} />
      <ChoiceUsageGuide kind={kind} />
      <details className={ui.disclosure}>
        <summary>전체 상태 비교</summary>
        <div className={styles.choiceGallery}>
          {variants.flatMap((shape) =>
            (['s', 'm'] as const).flatMap((itemSize) =>
              [false, true].flatMap((isDisabled) =>
                [false, true].map((isChecked) => {
                  const name = `${shape ?? definition.name} · ${itemSize.toUpperCase()} · ${isChecked ? '선택' : '해제'} · ${isDisabled ? 'disabled' : 'default'}`;
                  const props = {
                    size: itemSize,
                    disabled: isDisabled,
                    defaultChecked: isChecked,
                    'aria-label': name,
                  };
                  return (
                    <figure key={name}>
                      <figcaption>{name}</figcaption>
                      <PreviewStage label={name}>
                        {kind === 'checkbox' ? (
                          <Checkbox
                            {...props}
                            variant={shape}
                            label={shape === 'box' ? '체크' : undefined}
                          />
                        ) : kind === 'radio' ? (
                          <Radio {...props} />
                        ) : (
                          <Switch {...props} />
                        )}
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
        <summary>사용 옵션과 적용 기준</summary>
        <PropTable
          rows={[
            {
              name: 'size',
              type: 's | m',
              defaultValue: kind === 'switch' ? 'm' : 's',
              description:
                kind === 'checkbox'
                  ? '아이콘 20·24px. Box 높이 42·48px'
                  : kind === 'radio'
                    ? '아이콘 24·28px'
                    : 'S 42×28px / M 52×30px',
            },
            ...(kind === 'checkbox'
              ? [
                  {
                    name: 'variant',
                    type: 'square | line | box',
                    defaultValue: 'square',
                    description: 'Figma의 3종 표현',
                  },
                ]
              : []),
            {
              name: 'label / aria-label',
              type: 'ReactNode / string',
              defaultValue: '생략',
              description:
                '보이는 문구를 생략하면 aria-label 등 화면 읽기 프로그램이 읽을 이름을 전달',
            },
            {
              name: 'checked / defaultChecked',
              type: 'boolean',
              defaultValue: '기본 input과 동일',
              description:
                'checked와 onChange는 페이지에서 선택 여부를 관리할 때, defaultChecked는 처음 선택 여부만 정할 때 사용',
            },
            {
              name: 'name / value / onChange / disabled / ref',
              type: '기본 input 속성',
              defaultValue: '기본 input과 동일',
              description: 'Radio는 같은 name으로 묶어 단일 선택. 기본 폼 동작 유지',
            },
          ]}
        />
        <p className={ui.muted}>
          {kind === 'checkbox'
            ? '문구는 선택 요소이며 최대 2줄을 권장합니다. Square와 Line을 함께 사용하면 Square를 상위에 둡니다. 비활성 Box의 문구는 미선택이면 기본 글자색, 선택되어 있으면 비활성 글자색입니다.'
            : kind === 'radio'
              ? '같은 선택 그룹 안에서는 S·M 크기를 섞지 않습니다. 그룹의 설명은 사용하는 화면에서 fieldset·legend 등으로 제공합니다.'
              : '실제 설정 저장은 onChange에서 연결합니다. 켜짐/꺼짐에 따라 별도 업무 동작을 자동으로 추가하지 않습니다.'}
        </p>
        <SourceFiles
          files={[
            `src/components/${definition.name}/${definition.name}.tsx`,
            `src/components/${definition.name}/${definition.name}.module.scss`,
            'src/components/selection/SelectionImages/',
            'src/assets/styles/mixins/_selection.scss',
            'src/utils/assets.ts',
            'src/utils/cx.ts',
          ]}
        />
      </details>
    </>
  );
}
