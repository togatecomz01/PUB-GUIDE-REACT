import { Fragment, useState } from 'react';
import Button from '../../../../components/Button/Button.tsx';
import BottomSheet, { SheetOptions } from '../../../../components/BottomSheet/BottomSheet.tsx';
import type {
  BankColumns,
  BottomSheetProps,
} from '../../../../components/BottomSheet/BottomSheet.tsx';
import bankLogo from '../../../assets/bank-example.png';
import styles from './BottomSheetExample.module.scss';

const accounts = ['a', 'b', 'c'].map((value, index) => ({
  value,
  label: '은행명',
  description: '계좌번호',
  image: bankLogo,
  disabled: index > 0,
}));
const bankGroups = [
  { title: '일반 은행', count: 9 },
  { title: '기타 은행', count: 6 },
].map(({ title, count }) => ({
  title,
  items: Array.from({ length: count }, (_, index) => ({
    value: title + '-' + (index + 1),
    label: '은행 ' + (index + 1),
    image: bankLogo,
  })),
}));

export default function BottomSheetExample() {
  const [sheet, setSheet] = useState<'basic' | 'account' | 'bank' | null>(null);
  const [value, setValue] = useState('a');
  const [bank, setBank] = useState<string>();
  const [bankColumns, setBankColumns] = useState<BankColumns>(3);
  const [showDescription, setShowDescription] = useState(false);
  const [verticalActions, setVerticalActions] = useState(false);
  const isBasic = sheet === 'basic';
  const isBank = sheet === 'bank';
  const actions: BottomSheetProps['actions'] = isBank
    ? undefined
    : {
        layout: sheet === 'account' && verticalActions ? 'vertical' : 'horizontal',
        primary: { label: '확인', onClick: closeSheet },
        secondary: sheet === 'account' ? { label: '취소', onClick: closeSheet } : undefined,
      };

  function closeSheet() {
    setSheet(null);
  }

  return (
    <section style={{ maxWidth: 375, display: 'grid', gap: 16 }}>
      <Button onClick={() => setSheet('basic')}>기본 시트 열기</Button>
      <Button variant="secondary" onClick={() => setSheet('account')}>
        계좌 선택
      </Button>
      <Button variant="tertiary" onClick={() => setSheet('bank')}>
        은행 선택
      </Button>
      <details className={styles.settings}>
        <summary>시안 옵션</summary>
        <label>
          은행 열 수
          <select
            value={bankColumns}
            onChange={(event) => setBankColumns(Number(event.target.value) as BankColumns)}
          >
            <option value={1}>1열</option>
            <option value={2}>2열</option>
            <option value={3}>3열</option>
          </select>
        </label>
        <label>
          <input
            type="checkbox"
            checked={showDescription}
            onChange={(event) => setShowDescription(event.target.checked)}
          />
          보조 설명 표시
        </label>
        <label>
          <input
            type="checkbox"
            checked={verticalActions}
            onChange={(event) => setVerticalActions(event.target.checked)}
          />
          계좌 선택 버튼 세로 배치
        </label>
      </details>
      <BottomSheet
        open={sheet !== null}
        onClose={closeSheet}
        title={isBank ? bankGroups[0].title : '타이틀 내용'}
        description={showDescription ? '보조 설명을 작성해주세요.' : undefined}
        actions={actions}
        closeOnBackdrop={isBank}
      >
        {isBasic ? (
          <p>본문 내용이 들어갑니다.</p>
        ) : isBank ? (
          bankGroups.map(({ title, items }, index) => (
            <Fragment key={title}>
              {index > 0 && <h3 className={styles.bankHeading}>{title}</h3>}
              <SheetOptions
                kind="bank"
                columns={bankColumns}
                aria-label={title}
                items={items}
                value={bank}
                onValueChange={setBank}
              />
            </Fragment>
          ))
        ) : (
          <SheetOptions aria-label="계좌" items={accounts} value={value} onValueChange={setValue} />
        )}
      </BottomSheet>
    </section>
  );
}
