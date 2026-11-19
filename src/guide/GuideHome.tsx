import { useEffect, useState } from 'react';
import ComponentCatalog from './catalog/ComponentCatalog.tsx';
import { componentItems } from './catalog/catalogData.ts';
import CompositionGuide from './examples/CompositionGuide.tsx';
import ExpansionGuide from './components/extra/ExpansionGuide.tsx';
import { expansionPages } from './components/extra/expansionData.ts';
import { ButtonGuide } from './components/button/ButtonGuide.tsx';
import { ModalGuide } from './components/modal/ModalGuide.tsx';
import ChoiceGuide from './components/selection/ChoiceGuide.tsx';
import TabsGuide from './components/tabs/TabsGuide.tsx';
import FieldGuide from './components/fields/FieldGuide.tsx';
import ColorGuide from './colors/ColorGuide.tsx';
import TransferGuide from './setup/TransferGuide.tsx';
import { figmaLink } from './colors/foundations.ts';
import styles from './GuideHome.module.scss';

const navigation = [
  { id: 'components', title: '컴포넌트' },
  { id: 'composition', title: '화면 예제' },
  { id: 'styles', title: '가져다 쓰기' },
];
function readRoute() {
  const hash = window.location.hash.slice(1);
  if (['overview', ''].includes(hash)) return 'components';
  if (
    ['scope', 'spacing', 'radius', 'stroke', 'icon-size', 'component-size', 'layout'].includes(hash)
  )
    return 'styles';
  if (
    navigation.some((item) => item.id === hash) ||
    componentItems.some((item) => item.id === hash) ||
    ['color-base', 'color-semantic'].includes(hash)
  )
    return hash;
  return 'components';
}
export default function GuideHome() {
  const [page, setPage] = useState(readRoute);
  const component = componentItems.find((item) => item.id === page);
  const expanded = expansionPages.find((item) => item.id === page);
  const section =
    page === 'composition' ? 'composition' : page === 'styles' ? 'styles' : 'components';
  const title =
    component?.label ?? navigation.find((item) => item.id === page)?.title ?? '색상 참고';
  useEffect(() => {
    function update() {
      if (window.location.hash === '#pub-main') return;
      setPage(readRoute());
    }
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [page]);
  return (
    <div className={styles.guide}>
      <a className={styles.skip} href="#pub-main">
        본문으로 이동
      </a>
      <aside className={styles.sidebar}>
        <a className={styles.brand} href="#components">
          <span className={styles.brandMark} aria-hidden="true">
            P<span>↗</span>
          </span>
          <span>
            <strong>PUB GUIDE</strong>
            <small>React 컴포넌트</small>
          </span>
        </a>
        <nav aria-label="퍼블리싱 가이드">
          <ul>
            {navigation.map((item) => (
              <li key={item.id}>
                <a href={'#' + item.id} aria-current={section === item.id ? 'page' : undefined}>
                  <span className={styles.navTitle}>
                    <strong>{item.title}</strong>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <footer>
          <p>
            필요한 UI를 고르고
            <br />
            확인한 뒤 복사하세요.
          </p>
          <a href={figmaLink('22:624')} target="_blank" rel="noreferrer">
            Figma 원본 ↗
          </a>
        </footer>
      </aside>
      <div className={styles.content}>
        <header className={styles.topbar}>
          <span>
            퍼블리싱 가이드 <span aria-hidden="true">/</span>
            <strong>{title}</strong>
          </span>
        </header>
        <main id="pub-main" className={styles.main} key={page} tabIndex={-1}>
          {component && (
            <a className={styles.back} href="#components">
              ← 컴포넌트 목록
            </a>
          )}
          {page === 'components' && <ComponentCatalog />}
          {page === 'composition' && <CompositionGuide />}
          {page === 'styles' && <TransferGuide />}
          {page === 'color-base' && <ColorGuide />}
          {page === 'color-semantic' && <ColorGuide semantic />}
          {page === 'button' && <ButtonGuide />}
          {page === 'modal' && <ModalGuide />}
          {page === 'checkbox' && <ChoiceGuide kind="checkbox" />}
          {page === 'radio' && <ChoiceGuide kind="radio" />}
          {page === 'switch' && <ChoiceGuide kind="switch" />}
          {page === 'tab' && <TabsGuide />}
          {page === 'tabclip' && <TabsGuide clip />}
          {page === 'textfield' && <FieldGuide />}
          {page === 'searchfield' && <FieldGuide search />}
          {expanded && <ExpansionGuide id={expanded.id} />}
        </main>
      </div>
    </div>
  );
}
