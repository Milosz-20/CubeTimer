import styles from './Modals.module.scss';
import { Info } from 'lucide-react';
import type { ModalProps } from '../types/ModalProps';

export const PwdMatchModal: React.FC<ModalProps> = ({
  isVisible
}) => {
  if (!isVisible) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <Info size={20} />
        </div>
        <div className={styles.title}>Confirm password</div>
      </div>
      <div className={styles.contentPwd}>
        <p>Re-enter your password to confirm</p>
      </div>
    </div>
  );
};
