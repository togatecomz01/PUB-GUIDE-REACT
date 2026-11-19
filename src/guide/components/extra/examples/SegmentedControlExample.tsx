import { useState } from 'react';
import SegmentedControl from '../../../../components/SegmentedControl/SegmentedControl.tsx';
const items = [
  { value: 'all', label: '전체', content: '전체 내용' },
  { value: 'recent', label: '최근', content: '최근 내용' },
  { value: 'saved', label: '저장', content: '저장 내용' },
];
export default function SegmentedControlExample() {
  const [value, setValue] = useState('all');
  return (
    <div style={{ maxWidth: 375 }}>
      <SegmentedControl
        aria-label="조회 기준"
        items={items}
        value={value}
        onValueChange={setValue}
      />
      <SegmentedControl
        aria-label="세부 분류"
        alignment="fluid"
        items={Array.from({ length: 8 }, (_, i) => ({
          value: String(i),
          label: '상세 메뉴 ' + (i + 1),
        }))}
      />
    </div>
  );
}
