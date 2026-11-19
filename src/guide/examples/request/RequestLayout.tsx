import type { ReactNode } from 'react';
import Header from '../../../components/Header/Header.tsx';
import styles from './RequestLayout.module.scss';

export default function RequestLayout({ children }: { children: ReactNode }) {
  return (
    <section className={styles.page} aria-label="서비스 신청 화면">
      <Header type="sub-page" title="서비스 신청 예제" gradient={false} />
      <div className={styles.content}>{children}</div>
    </section>
  );
}
