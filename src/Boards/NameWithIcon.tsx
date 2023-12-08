import styles from './index.module.css';

interface NameWithIconProps {
  size: 'small' | 'large';
  icon: string;
  name: string;
  rounded?: boolean;
}

export const NameWithIcon = ({ size, icon, name, rounded }: NameWithIconProps) => {
  return (
    <div className={styles.nameContainer}>
    <img src={icon} alt="" className={`${size === 'small' ? styles.iconSmall : styles.iconLarge} ${rounded ? styles.iconRounded : ''}`} />
    <span className={styles.ellipsis}>{name}</span>
  </div>
  )
}