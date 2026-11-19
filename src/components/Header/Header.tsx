import type { ReactNode } from 'react';
import Icon from '../Icon/Icon.tsx';
import { cx } from '../../utils/cx.ts';
import styles from './Header.module.scss';
export type HeaderType = 'main' | 'main-sub' | 'sub' | 'sub-page' | 'popup';
export type HeaderProps = {
  type?: HeaderType;
  name?: string;
  title?: string;
  gradient?: boolean;
  onBack?: () => void;
  onClose?: () => void;
  onHome?: () => void;
  onMenu?: () => void;
  onAlarm?: () => void;
  actions?: ReactNode;
  className?: string;
};
export default function Header({
  type = 'main',
  name,
  title,
  gradient = true,
  onBack,
  onClose,
  onHome,
  onMenu,
  onAlarm,
  actions,
  className,
}: HeaderProps) {
  const isMain = type === 'main' || type === 'main-sub';
  const isSub = type === 'sub';
  const isPopup = type === 'popup';
  function renderAction(
    label: string,
    icon: 'header-alarm' | 'header-home' | 'header-menu' | 'header-back' | 'header-close',
    handler?: () => void,
  ) {
    return (
      <button type="button" aria-label={label} disabled={!handler} onClick={handler}>
        <Icon name={icon} size={24} />
      </button>
    );
  }
  let content;
  if (isMain) {
    content = (
      <>
        <p className={styles.profile}>
          <strong>{name}</strong>님
        </p>
        <div className={styles.actions}>
          {actions ?? (
            <>
              {renderAction('알림', 'header-alarm', onAlarm)}
              {type === 'main' && renderAction('홈', 'header-home', onHome)}
              {renderAction('메뉴', 'header-menu', onMenu)}
            </>
          )}
        </div>
      </>
    );
  } else if (isSub) {
    content = (
      <>
        {renderAction('뒤로', 'header-back', onBack)}
        {actions ?? renderAction('닫기', 'header-close', onClose)}
      </>
    );
  } else {
    content = (
      <>
        <h1 className={styles.title}>{title}</h1>
        {isPopup && (actions ?? renderAction('닫기', 'header-close', onClose))}
      </>
    );
  }

  return (
    <header className={cx(styles.root, gradient && styles.gradient, className)}>
      <div className={cx(styles.bar, styles[type])}>{content}</div>
    </header>
  );
}
