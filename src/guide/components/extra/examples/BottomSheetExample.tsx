import { useState } from 'react';
import Button from '../../../../components/Button/Button.tsx';
import BottomSheet, { SheetOptions } from '../../../../components/BottomSheet/BottomSheet.tsx';
import SelectField from '../../../../components/SelectField/SelectField.tsx';

const accounts = [
  { value: 'a', label: '첫 번째 계좌', description: '계좌 설명' },
  { value: 'b', label: '두 번째 계좌', description: '계좌 설명' },
  { value: 'c', label: '사용할 수 없는 계좌', disabled: true },
];
const banks = [
  { value: 'a', label: '은행 A' },
  { value: 'b', label: '은행 B' },
  { value: 'c', label: '은행 C' },
];
export default function BottomSheetExample() {
  const [sheet, setSheet] = useState<'basic' | 'account' | 'bank' | null>(null);
  const [value, setValue] = useState('a');
  return (
    <section style={{ maxWidth: 375, display: 'grid', gap: 16 }}>
      <Button onClick={() => setSheet('basic')}>기본 시트 열기</Button>
      <Button variant="secondary" onClick={() => setSheet('account')}>
        계좌 선택
      </Button>
      <Button variant="tertiary" onClick={() => setSheet('bank')}>
        은행 선택
      </Button>
      <BottomSheet
        open={sheet !== null}
        onClose={() => setSheet(null)}
        title={sheet === 'basic' ? '안내' : '항목 선택'}
        description="현재 화면에서 필요한 내용을 확인하세요."
        actions={
          sheet === 'bank'
            ? undefined
            : {
                primary: { label: '확인', onClick: () => setSheet(null) },
                secondary:
                  sheet === 'account'
                    ? { label: '취소', onClick: () => setSheet(null) }
                    : undefined,
              }
        }
      >
        {sheet === 'basic' ? (
          <>
            <p>내용과 입력 컴포넌트를 함께 배치할 수 있습니다.</p>
            <SelectField label="선택 항목" options={banks} value={value} onValueChange={setValue} />
          </>
        ) : (
          <SheetOptions
            kind={sheet === 'bank' ? 'bank' : 'account'}
            aria-label={sheet === 'bank' ? '은행' : '계좌'}
            items={sheet === 'bank' ? banks : accounts}
            value={value}
            onValueChange={setValue}
          />
        )}
      </BottomSheet>
    </section>
  );
}
