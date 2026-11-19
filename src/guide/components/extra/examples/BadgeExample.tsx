import Badge from '../../../../components/Badge/Badge.tsx';
export default function BadgeExample() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Badge tone="success">완료</Badge>
      <Badge variant="fill" tone="brand-weak" size="s">
        신규
      </Badge>
    </div>
  );
}
