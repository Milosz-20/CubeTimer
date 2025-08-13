import styles from './Modals.module.scss';
import { Info } from 'lucide-react';
import { ModalProps } from '../types/ModalProps';

export const NicknameModal: React.FC<ModalProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div
      className={styles.modal}
      role='dialog'
      aria-modal='true'
      aria-labelledby='nickname-modal-title'
      aria-describedby='nickname-modal-desc'
    >
      <div className={styles.header}>
        <div className={styles.icon} aria-hidden='true'>
          <Info size={20} aria-hidden='true' focusable='false' />
        </div>
        <div id='nickname-modal-title' className={styles.title}>
          Nickname Info
        </div>
      </div>
      <div className={styles.content}>
        <p id='nickname-modal-desc'>How others will see your name:</p>{' '}
        <ul>
          <li>Minimum 3 characters</li>
          <li>Any characters allowed, spaces, emojis</li>
        </ul>
        <p>
          <strong>Example:</strong>
          <code>John Doe ✨</code>
        </p>
      </div>
    </div>
  );
};
