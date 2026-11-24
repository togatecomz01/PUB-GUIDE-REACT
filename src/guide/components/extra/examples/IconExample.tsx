import Icon from '../../../../components/Icon/Icon.tsx';
export default function IconExample() {
  return (
    <div
      style={{
        display: 'flex',
        gap: 16,
        alignItems: 'center',
        color: '#3182f6',
      }}
    >
      <Icon name="search" size={24} label="검색" />
      <button type="button" aria-label="닫기">
        <Icon name="close" size={20} />
      </button>
    </div>
  );
}
