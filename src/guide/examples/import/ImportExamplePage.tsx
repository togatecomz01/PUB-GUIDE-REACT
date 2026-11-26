import TextField from '../../../components/fields/TextField/TextField.tsx';
import Button from '../../../components/buttons/Button/Button.tsx';
import Modal from '../../../components/Modal/Modal.tsx';
import useImportExample from './useImportExample.ts';
import styles from './ImportExamplePage.module.scss';

export default function ImportExamplePage() {
  const example = useImportExample();

  return (
    <div className={styles.root}>
      <TextField
        label="이름"
        placeholder="예시 이름을 입력하세요"
        value={example.name}
        onValueChange={example.setName}
      />
      <Button onClick={example.openModal}>입력 내용 보기</Button>
      <Modal
        open={example.modalOpen}
        onClose={example.closeModal}
        title="입력 내용 확인"
        description={example.name || '입력한 이름이 없습니다.'}
      />
    </div>
  );
}
