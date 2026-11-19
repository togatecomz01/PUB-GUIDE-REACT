import Accordion from '../../../../components/Accordion/Accordion.tsx';
export default function AccordionExample() {
  return (
    <section style={{ maxWidth: 375, display: 'grid', gap: 24 }}>
      <Accordion title="알아두세요" defaultOpen>
        <ul>
          <li>안내 문구입니다.</li>
          <li>추가 안내 문구입니다.</li>
        </ul>
      </Accordion>
      <Accordion title="자주 묻는 질문" variant="box">
        <p>각 항목은 독립적으로 열고 닫습니다.</p>
        <p>필요한 콘텐츠를 children으로 넣습니다.</p>
      </Accordion>
    </section>
  );
}
