import newTag from './new.svg';
import increaseTag from './increase.svg';
import decreaseTag from './decrease.svg';
import { formatNumberWithCommas } from '../utils/format';

import styles from './index.module.css';

interface OpenRankProps {
  delta: number | '-';
  openrank: number;
  decimal?: boolean;
}

const formatNumber = (num: number, decimal = true) => {
  if (!decimal) {
    return formatNumberWithCommas(num.toFixed(0));
  }
  return num.toFixed(2);
}

export const OpenRank = ({ delta, openrank, decimal }: OpenRankProps) => {
  if (delta === '-') {
    return (
      <div className={styles.openrankContainer}>
        <span className={styles.openrank}>{formatNumber(openrank, decimal)}</span>
        <img className={styles.tag} src={newTag} alt='new' />
      </div>
    );
  }
  return (
    <div className={styles.openrankContainer}>
      <span>{formatNumber(openrank, decimal)}</span>
      <img className={styles.tag} src={delta > 0 ? increaseTag : decreaseTag} alt='increase/decrease' />
      <span>{formatNumber(Math.abs(delta), decimal)}</span>
    </div>
  );
}