import TabList from '../TabList/TabList.tsx';
import type { TabProps } from '../TabList/TabList.tsx';
import styles from './TabClip.module.scss';

export type { TabItem, TabProps as TabClipProps } from '../TabList/TabList.tsx';
/* 문구 너비에 맞춘 칩 형태의 탭 표시 */
export default function TabClip(props: TabProps) {
  return <TabList {...props} styles={styles} />;
}
