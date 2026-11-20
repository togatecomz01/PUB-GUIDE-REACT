import componentSource from '../../../components/Modal/Modal.tsx?raw';
import styles from '../../ui/GuideUi.module.scss';
import { useState } from 'react';
import Modal, { DialogActions, DialogCard } from '../../../components/Modal/Modal.tsx';
import type { DialogKind, DialogActionLayout } from '../../../components/Modal/Modal.tsx';
import {
  CodeReadingGuide,
  CodeBlock,
  PageTitle,
  PreviewStage,
  PropTable,
  SourceFiles,
} from '../../ui/GuideUi.tsx';
import { createModalExample } from '../../ui/codeExamples.ts';

export function ModalGuide() {
  const [kind, setKind] = useState<DialogKind>('confirm');
  const [layout, setLayout] = useState<DialogActionLayout>('horizontal');
  const [title, setTitle] = useState('다시 촬영해주세요');
  const [description, setDescription] = useState('내용을 입력해 주세요.');
  const [showDescription, setShowDescription] = useState(true);
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState('');
  const content = showDescription ? description : undefined;
  const { code, fullCode } = createModalExample({
    kind,
    layout,
    title,
    description: content,
  });

  function changeKind(value: DialogKind) {
    setKind(value);
    setTitle(value === 'alert' ? '안내' : '다시 촬영해주세요');
  }

  function openModal() {
    setResult('');
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
    setResult('모달이 닫혔습니다.');
  }

  function confirmModal() {
    setOpen(false);
    setResult('확인 동작 후 모달이 닫혔습니다.');
  }

  return (
    <>
      <PageTitle
        number="06"
        title="<Modal>"
        description="미리보기와 컴포넌트 코드를 확인하세요."
        node="301:1804"
      />
      <div className={styles.componentMeta}>
        <span className={[styles.status, styles.statusReady].join(' ')}>구현 초안</span>
        <code>Modal.tsx</code>
        <span>확인만 있는 창 · 취소/확인이 있는 창</span>
      </div>
      <section className={styles.workbench} aria-label="모달 실행 예제">
        <div className={styles.modalStage}>
          <span className={styles.stageLabel}>모양 미리보기</span>
          <PreviewStage label={`${kind} 모달 디자인 미리보기`}>
            <DialogCard kind={kind} layout={layout} title={title} description={content} />
          </PreviewStage>
          <button className={styles.action} type="button" onClick={openModal}>
            모달 실행
          </button>
          <p className={styles.liveMessage} role="status">
            {result || '열기·닫기와 키보드 이동을 확인하세요'}
          </p>
        </div>
        <form className={styles.controls} onSubmit={(event) => event.preventDefault()}>
          <h2>미리보기 설정</h2>
          <label>
            종류
            <select
              aria-label="종류"
              value={kind}
              onChange={(event) => changeKind(event.target.value as DialogKind)}
            >
              <option value="alert">확인만</option>
              <option value="confirm">취소 + 확인</option>
            </select>
          </label>
          <label>
            버튼 배치
            <select
              aria-label="버튼 배치"
              value={layout}
              onChange={(event) => setLayout(event.target.value as DialogActionLayout)}
              disabled={kind === 'alert'}
            >
              <option value="horizontal">가로 배치</option>
              <option value="vertical">세로 배치</option>
            </select>
          </label>
          <label>
            제목
            <input value={title} onChange={(event) => setTitle(event.target.value)} />
          </label>
          <label className={styles.check}>
            <input
              type="checkbox"
              checked={showDescription}
              onChange={(event) => setShowDescription(event.target.checked)}
            />{' '}
            본문 표시
          </label>
          <label>
            본문
            <textarea
              rows={2}
              value={description}
              disabled={!showDescription}
              onChange={(event) => setDescription(event.target.value)}
            />
          </label>
        </form>
      </section>
      <p className={styles.muted}>
        Alert 확인은 <a href="#textbutton">TextButton</a>을 재사용합니다. HTML dialog의 열기·닫기와
        배경 스크롤 잠금은 <a href="#bottomsheet">BottomSheet</a>와 공통으로 처리합니다.
      </p>
      <CodeBlock label="<Modal> 사용 코드" code={code} />
      <CodeReadingGuide
        note="DialogActions는 확인만·세로·가로 배치를 if문으로 고릅니다. cancelModal은 닫기를 요청하고, keepFocusInside는 키보드 포커스를 창 안에 유지합니다."
        sources={[{ name: 'Modal.tsx', code: componentSource }]}
      />
      <details className={styles.disclosure}>
        <summary>상태 관리를 포함한 전체 예제 보기</summary>
        <CodeBlock label="Modal 전체 예제" code={fullCode} />
      </details>
      <details className={styles.disclosure}>
        <summary>버튼 배치 3종 보기</summary>
        <section className={styles.section}>
          <header className={styles.subhead}>
            <h2>버튼 영역</h2>
            <span>디자인의 3가지 배치</span>
          </header>
          <p className={styles.muted}>
            제목과 버튼 영역은 필수, 본문은 선택입니다. 버튼 2개의 문구가 길어질 때 세로 배치를
            사용합니다.
          </p>
          <div className={styles.actionGallery}>
            <figure>
              <PreviewStage label="Alert 확인 버튼">
                <DialogActions className={styles.previewActions} />
              </PreviewStage>
              <figcaption>Alert · 텍스트 버튼 1개</figcaption>
            </figure>
            <figure>
              <PreviewStage label="Confirm 가로 버튼">
                <DialogActions className={styles.previewActions} kind="confirm" />
              </PreviewStage>
              <figcaption>Confirm · 가로 배치</figcaption>
            </figure>
            <figure>
              <PreviewStage label="Confirm 세로 버튼">
                <DialogActions className={styles.previewActions} kind="confirm" layout="vertical" />
              </PreviewStage>
              <figcaption>Confirm · 세로 배치</figcaption>
            </figure>
          </div>
        </section>
      </details>
      <details className={styles.disclosure}>
        <summary>사용 옵션과 적용 기준</summary>
        <PropTable
          rows={[
            {
              name: 'open',
              type: 'boolean',
              defaultValue: '필수',
              description: '사용하는 화면에서 열림 상태를 관리',
            },
            {
              name: 'onClose',
              type: '() => void',
              defaultValue: '필수',
              description: '취소·Esc에서 호출. open을 false로 변경',
            },
            {
              name: 'onConfirm',
              type: '() => void',
              defaultValue: 'onClose',
              description: '확인 동작. 전달할 경우 닫기까지 직접 처리',
            },
            {
              name: 'kind',
              type: 'alert | confirm',
              defaultValue: 'alert',
              description: '확인 단일형 또는 취소·확인형',
            },
            {
              name: 'layout',
              type: 'horizontal | vertical',
              defaultValue: 'horizontal',
              description: 'Confirm 버튼 2개의 배치',
            },
            {
              name: 'title',
              type: 'string',
              defaultValue: '필수',
              description: '최대 1줄 권장',
            },
            {
              name: 'description',
              type: 'ReactNode',
              defaultValue: '생략',
              description:
                '본문은 description으로 전달합니다. 짧은 문구를 권장하며 최대 3줄을 기준으로 사용하세요.',
            },
            {
              name: 'confirmLabel / cancelLabel',
              type: 'string',
              defaultValue: '확인 / 취소',
              description: '화면에 맞는 버튼 문구',
            },
          ]}
        />
        <div className={styles.callout}>
          <strong>실행 예제에서 확인할 동작</strong>
          <p>
            Tab·Shift+Tab은 모달 안에서 이동하고, Esc·취소는 닫기를 요청합니다. 닫힌 뒤 호출
            버튼으로 포커스가 돌아갑니다. 배경 클릭으로 닫는 동작은 정의하지 않았습니다.
            Modal.module.scss는 컴포넌트 내부 스타일이며, 사용하는 페이지에서 내부 클래스를 직접
            선택하지 않습니다.
          </p>
        </div>
        <SourceFiles
          files={['src/components/Modal/Modal.tsx', 'src/components/Modal/Modal.module.scss']}
        />
      </details>
      <Modal
        open={open}
        kind={kind}
        layout={layout}
        title={title}
        description={content}
        onClose={closeModal}
        onConfirm={confirmModal}
      />
    </>
  );
}
