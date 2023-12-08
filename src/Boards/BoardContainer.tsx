import orbit from './orbit.gif';

import { ReactNode } from 'react';

import styles from './index.module.css';

interface BoardContainerProps {
  children?: ReactNode;
  size: 'small' | 'large';
  title: string;
}

export const BoardContainer = ({ children, size, title }: BoardContainerProps) => {
  if (size === 'small') {
    return (
      <div
        className={`${styles.boardContainer} ${styles.small}`}
      >
        <div className={styles.boardTitleSmall}>
          <img src={orbit} alt="" className={styles.boardTitleIconSmall}/>
          <span className={styles.boardTitleTextSmall}>{title}</span>
        </div>
        {children}
      </div>
    )
  }

  if (size === 'large') {
    return (
      <div
        className={`${styles.boardContainer} ${styles.large}`}
      >
        <div className={styles.boardTitleLarge}>
          <img src={orbit} alt="" className={styles.boardTitleIconLarge}/>
          <span className={styles.boardTitleTextLarge}>{title}</span>
        </div>
        {children}
      </div>
    )
  }
}