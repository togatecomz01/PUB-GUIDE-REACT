import TabList from '../internal/TabList/TabList.tsx';
import type { TabProps } from '../internal/TabList/TabList.tsx';
import styles from './Tab.module.scss';

export type { TabItem, TabProps } from '../internal/TabList/TabList.tsx';
/* 탭 개수에 맞춰 균등 너비 또는 고정 너비 적용 */
export default function Tab(props: TabProps) {
  return <TabList {...props} styles={styles} fixedItems={props.items.length >= 4} />;
}
