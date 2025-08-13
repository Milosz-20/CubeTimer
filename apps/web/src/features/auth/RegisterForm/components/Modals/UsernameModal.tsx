import styles from './Modals.module.scss';
import { Info } from 'lucide-react';
import { ModalProps } from '../types/ModalProps';

export const UsernameModal: React.FC<ModalProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <Info size={20} />
        </div>
        <div className={styles.title}>Username Guidelines</div>
      </div>
      <div className={styles.content}>
        <p>Your unique identifier on the platform:</p>
        <ul>
          <li>Minimum 3 characters, letters, numbers, underscores only</li>
          <li>No spaces or special characters</li>
        </ul>
        <p>
          <strong>Example:</strong>
          <code>john_doe123</code>
        </p>
      </div>
    </div>
  );
};
