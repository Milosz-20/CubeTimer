import React from 'react';
import styles from './Actions.module.css';
import { Button } from '@components/ui/Button';
import { Lock, Unlock, Clipboard, Repeat } from 'lucide-react';

interface ActionsProps {
  onLock: () => void;
  onCopy: () => void;
  onGenerate: () => void;
  isScrambleLocked: boolean;
}

const Actions: React.FC<ActionsProps> = ({
  onLock,
  onCopy,
  onGenerate,
  isScrambleLocked
}) => {
  return (
    <div className={styles.options}>
      <div
        className={`${styles.lockButton} ${isScrambleLocked ? styles.locked : styles.unlocked}`}
      >
        <Button
          onClick={onLock}
          icon={isScrambleLocked ? <Lock size={20} /> : <Unlock size={20} />}
          animation='shrink'
          title={isScrambleLocked ? 'Unlock scramble' : 'Lock scramble'}
        />
      </div>
      <Button
        onClick={onCopy}
        icon={<Clipboard size={20} />}
        animation='shrink'
        title='Copy to clipboard'
      />
      <Button
        onClick={onGenerate}
        icon={<Repeat size={20} />}
        animation={isScrambleLocked ? 'error' : 'shrink'}
        title='Generate new scramble'
      />
    </div>
  );
};

export default Actions;
