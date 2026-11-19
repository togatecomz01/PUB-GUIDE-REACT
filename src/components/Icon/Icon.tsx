import type { CSSProperties } from 'react';
import { cx } from '../../utils/cx.ts';
import styles from './Icon.module.scss';

export const iconNames = [
  'alert_circle',
  'alert_triangle',
  'arrow_down',
  'arrow_down_left',
  'arrow_down_right',
  'arrow_left',
  'arrow_right',
  'arrow_up',
  'arrow_up_left',
  'arrow_up_right',
  'bell',
  'bell_off',
  'bookmark',
  'calendar',
  'check',
  'chevron_down',
  'chevron_left',
  'chevron_right',
  'chevron_up',
  'clock',
  'close',
  'del',
  'delete',
  'download',
  'edit',
  'edit_2',
  'edit_3',
  'external_link',
  'eye',
  'eye_off',
  'file_plus',
  'filter',
  'folder',
  'folder_minus',
  'folder_plus',
  'gift',
  'header-alarm',
  'header-back',
  'header-close',
  'header-home',
  'header-menu',
  'heart',
  'help_circle',
  'info',
  'link_2',
  'list',
  'lock',
  'mail',
  'map',
  'map_pin',
  'menu',
  'minus',
  'more_horizontal',
  'more_vertical',
  'paperclip',
  'plus',
  'refresh_ccw',
  'refresh_cw',
  'rotate_ccw',
  'rotate_cw',
  'search',
  'send',
  'settings',
  'shopping_cart',
  'sliders',
  'trash_2',
  'unlock',
  'upload',
  'user_plus',
  'zoom_in',
  'zoom_out',
] as const;
export type IconName = (typeof iconNames)[number];
const sources = import.meta.glob('../../assets/icons/ico_*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;
export type IconProps = {
  name: IconName;
  size?: 16 | 20 | 24 | 32;
  label?: string;
  className?: string;
};
export default function Icon({ name, size = 20, label, className }: IconProps) {
  const fileName = 'ico_' + name.replaceAll('-', '_') + '.svg';
  const source =
    sources['../../assets/icons/' + fileName]?.replaceAll('#222222', 'currentColor') ?? '';
  return (
    <span
      className={cx(styles.icon, className)}
      style={{ '--icon-size': size + 'px' } as CSSProperties}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      dangerouslySetInnerHTML={{ __html: source }}
    />
  );
}
