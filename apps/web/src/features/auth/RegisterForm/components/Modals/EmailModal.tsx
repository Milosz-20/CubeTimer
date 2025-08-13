import styles from './Modals.module.scss';
import { Info } from 'lucide-react';
import { ModalProps } from '../types/ModalProps';

export const EmailModal: React.FC<ModalProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <Info size={20} />
        </div>
        <div className={styles.title}>Email Address</div>
      </div>
      <div className={styles.content}>
        <p>For account verification</p>
        <ul>
          <li>Must be a valid email format</li>
          <li>Used for verification, notifications and password recovery</li>
        </ul>
        <p>
          <strong>Example:</strong>
          <code>john.doe@example.com</code>
        </p>
      </div>
    </div>
  );
};
