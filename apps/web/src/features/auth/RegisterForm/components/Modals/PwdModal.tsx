import styles from './Modals.module.scss';
import { Info, Check, X } from 'lucide-react';
import { ModalProps } from '../types/ModalProps';

interface PasswordRequirement {
  id: string;
  text: string;
  validator: (password: string) => boolean;
}

interface PwdModalProps extends ModalProps {
  password: string;
}

// Password requirements configuration
const PASSWORD_REQUIREMENTS: PasswordRequirement[] = [
  {
    id: 'length',
    text: 'At least 8 characters long',
    validator: (password: string) => password.length >= 8
  },
  {
    id: 'lowercase',
    text: 'One lowercase letter (a-z)',
    validator: (password: string) => /[a-z]/.test(password)
  },
  {
    id: 'uppercase',
    text: 'One uppercase letter (A-Z)',
    validator: (password: string) => /[A-Z]/.test(password)
  },
  {
    id: 'number',
    text: 'One number (0-9)',
    validator: (password: string) => /\d/.test(password)
  },
  {
    id: 'special',
    text: 'One special character (!@#$%^&*)',
    validator: (password: string) => /[!@#$%^&*(),.?":{}|<>]/.test(password)
  }
];

export const PwdModal: React.FC<PwdModalProps> = ({ isVisible, password }) => {
  if (!isVisible) return null;

  const checkRequirements = () => {
    return PASSWORD_REQUIREMENTS.map((requirement) => ({
      ...requirement,
      met: requirement.validator(password)
    }));
  };

  const requirements = checkRequirements();
  const allRequirementsMet = requirements.every((req) => req.met);

  return (
    <div className={styles.modal}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <Info size={20} />
        </div>
        <div className={styles.title}>Password Requirements</div>
      </div>
      <div className={`${styles.contentPwd} ${allRequirementsMet}`}>
        <p>Create strong password to secure your account</p>
        <ul className={styles.requirements}>
          {requirements.map((requirement) => (
            <li
              key={requirement.id}
              className={`${styles.requirement} ${requirement.met ? styles.met : styles.unmet}`}
            >
              {requirement.met ? (
                <Check size={16} className={styles.checkIcon} />
              ) : (
                <X size={16} className={styles.xIcon} />
              )}

              <span className={styles.requirementText}>{requirement.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
