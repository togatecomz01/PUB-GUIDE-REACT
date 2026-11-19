import Tooltip from '../../../../components/Tooltip/Tooltip.tsx';
export default function TooltipExample() {
  return (
    <Tooltip label="수수료 안내" title="확인해 주세요">
      <ul>
        <li>거래 조건에 따라 수수료가 달라집니다.</li>
        <li>상세 조건을 확인해 주세요.</li>
      </ul>
    </Tooltip>
  );
}
