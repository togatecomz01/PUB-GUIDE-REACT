import TabList from '../internal/TabList/TabList.tsx';
import type { TabProps } from '../internal/TabList/TabList.tsx';
import styles from './Tab.module.scss';

export type { TabItem, TabProps } from '../internal/TabList/TabList.tsx';
export default function Tab(props: TabProps) {
  return <TabList {...props} styles={styles} fixedItems={props.items.length >= 4} />;
}
