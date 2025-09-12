import styles from './NiceLine.module.css';

interface NiceLineProps {
  className?: string;
}

const NiceLine: React.FC<NiceLineProps> = ({ className }) => {
  const combinedClassName = className
    ? `${styles.niceLine} ${className}`
    : styles.niceLine;

  return <div className={combinedClassName} />;
};

export default NiceLine;
