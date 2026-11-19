import TabList from '../internal/TabList/TabList.tsx';
import type { TabProps } from '../internal/TabList/TabList.tsx';
import styles from './TabClip.module.scss';

export type { TabItem, TabProps as TabClipProps } from '../internal/TabList/TabList.tsx';
export default function TabClip(props: TabProps) {
  return <TabList {...props} styles={styles} />;
}
