import {
  User,
  AtSign,
  Mail,
  Lock,
  LockKeyhole,
  ArrowLeft,
  Eye,
  EyeOff
} from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import styles from './RegisterForm.module.scss';
import { Button } from '@components/ui/Button';
import { useNavigate } from 'react-router-dom';
import {
  UsernameModal,
  NicknameModal,
  EmailModal,
  PwdModal,
  PwdMatchModal
} from './components/Modals/index';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{2,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NICKNAME_REGEX = /^[a-zA-Z0-9\s-_]{2,30}$/;

const RegisterForm: React.FC = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const pwdMatchRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  // Username
  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  const [showUsernameModal, setShowUsernameModal] = useState(false);

  // Nickname
  const [nickname, setNickname] = useState('');
  const [validNickname, setValidNickname] = useState(false);
  const [nicknameFocus, setNicknameFocus] = useState(false);
  const [showNicknameModal, setShowNicknameModal] = useState(false);

  // Email
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  // Password
  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [showPwdModal, setShowPwdModal] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  // Password Match
  const [pwdMatch, setPwdMatch] = useState('');
  const [validPwdMatch, setValidPwdMatch] = useState(false);
  const [pwdMatchFocus, setPwdMatchFocus] = useState(false);
  const [showPwdMatchModal, setShowPwdMatchModal] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleGoBack = () => {
    navigate('/timer');
  };

  // Function to validate passwords using refs
  const validatePasswords = () => {
    const password = pwdRef.current?.value || '';
    const confirmPassword = pwdMatchRef.current?.value || '';

    const isPwdValid = PWD_REGEX.test(password);
    const doPasswordsMatch =
      password === confirmPassword && password.length > 0 && isPwdValid;

    setValidPwd(isPwdValid);
    setValidPwdMatch(doPasswordsMatch);

    return { isPwdValid, doPasswordsMatch };
  };

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = NICKNAME_REGEX.test(nickname);
    setValidNickname(result);
  }, [nickname]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    setErrMsg('');
  }, [user, nickname, email, pwd, pwdMatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Get password values directly from refs (more secure)
    const password = pwdRef.current?.value;

    // Final validation before submission
    const { isPwdValid, doPasswordsMatch } = validatePasswords();

    if (!isPwdValid) {
      setErrMsg('Password does not meet requirements');
      return;
    }

    if (!doPasswordsMatch) {
      setErrMsg('Passwords do not match');
      return;
    }

    // All validations passed - proceed with form submission
    const formData = {
      username: user,
      nickname: nickname,
      email: email,
      password: password // Only access password when needed for submission
    };

    console.log('Form submitted with data:', {
      ...formData,
      password: '[REDACTED]'
    });

    // Clear password fields after submission for security
    if (pwdRef.current) pwdRef.current.value = '';
    if (pwdMatchRef.current) pwdMatchRef.current.value = '';
    setPwd('');
    setPwdMatch('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <Button
            icon={<ArrowLeft size={24} />}
            borderRd='1rem'
            className={styles.back}
            onClick={handleGoBack}
          />
          <h1>Create Account</h1>
        </div>
        <p>Join us and start your journey</p>
      </div>

      <form onSubmit={handleSubmit} autoComplete='off' noValidate>
        {/* Username */}
        <div className={styles['form-group']}>
          <User className={styles['input-icon']} size={20} />
          <input
            type='text'
            id='username'
            ref={userRef}
            value={user}
            onChange={(e) => {
              setUser(e.target.value);
            }}
            onBlur={() => {
              setUserFocus(true);
              setShowUsernameModal(false);
            }}
            onFocus={() => setShowUsernameModal(true)}
            placeholder='Username'
            autoComplete='off'
            required
          />
          <UsernameModal isVisible={showUsernameModal} />
        </div>

        {/* Nickname */}
        <div className={styles['form-group']}>
          <AtSign className={styles['input-icon']} size={20} />
          <input
            type='text'
            id='nickname'
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
            }}
            onBlur={() => {
              setNicknameFocus(true);
              setShowNicknameModal(false);
            }}
            onFocus={() => setShowNicknameModal(true)}
            placeholder='Nickname'
            autoComplete='off'
            required
          />
          <NicknameModal isVisible={showNicknameModal} />
        </div>
        {/* Email */}
        <div className={styles['form-group']}>
          <Mail className={styles['input-icon']} size={20} />
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onBlur={(e) => {
              setEmailFocus(true);
              setShowEmailModal(false);
            }}
            onFocus={() => setShowEmailModal(true)}
            placeholder='Email Address'
            autoComplete='email'
            required
          />
          <EmailModal isVisible={showEmailModal} />
        </div>

        {/* Password */}
        <div className={styles['form-group']}>
          <Lock className={styles['input-icon']} size={20} />
          <input
            type={showPwd === false ? 'password' : 'text'}
            id='password'
            ref={pwdRef}
            value={pwd}
            onChange={(e) => {
              setPwd(e.target.value);
              // Validate passwords whenever password changes
              setTimeout(validatePasswords, 0);
            }}
            onBlur={(e) => {
              setPwdFocus(true);
              setShowPwdModal(false);
              validatePasswords();
            }}
            onFocus={() => setShowPwdModal(true)}
            placeholder='Password'
            autoComplete='new-password'
            required
            className={
              pwd.length > 0
                ? validPwd
                  ? styles['pwd-valid']
                  : styles['pwd-invalid']
                : ''
            }
          />
          <Button
            icon={showPwd ? <Eye size={20} /> : <EyeOff size={20} />}
            className={styles['eye-button']}
            onMouseDown={() => setShowPwd(true)}
            onMouseUp={() => setShowPwd(false)}
            onMouseLeave={() => setShowPwd(false)}
            onTouchStart={() => setShowPwd(true)}
            onTouchEnd={() => setShowPwd(false)}
            borderRd='8px'
            aria-label={
              showPwd ? 'Release to hide password' : 'Hold to show password'
            }
            type='button'
          />
          <PwdModal isVisible={showPwdModal} password={pwd} />
        </div>

        {/* Repeat Password */}
        <div className={styles['form-group']}>
          <LockKeyhole className={styles['input-icon']} size={20} />
          <input
            type={showPwd === false ? 'password' : 'text'}
            id='repeatPassword'
            ref={pwdMatchRef}
            value={pwdMatch}
            onChange={(e) => {
              setPwdMatch(e.target.value);
              // Validate passwords whenever confirm password changes
              setTimeout(validatePasswords, 0);
            }}
            onBlur={(e) => {
              setPwdMatchFocus(true);
              setShowPwdMatchModal(false);
              validatePasswords();
            }}
            onFocus={() => setShowPwdMatchModal(true)}
            placeholder='Repeat Password'
            autoComplete='new-password'
            required
            className={
              pwdMatch.length > 0
                ? validPwdMatch
                  ? styles['pwd-match']
                  : styles['pwd-not-match']
                : ''
            }
          />
          <PwdMatchModal isVisible={showPwdMatchModal} />
        </div>

        {/* Error Message */}
        {errMsg && (
          <div
            ref={errRef}
            className={styles['error-msg']}
            aria-live='assertive'
          >
            {errMsg}
          </div>
        )}

        {/* Submit Button */}
        <button
          type='submit'
          className={styles['submit-btn']}
          disabled={
            !validName ||
            !validNickname ||
            !validEmail ||
            !validPwd ||
            !validPwdMatch
          }
        >
          Create Account
        </button>
      </form>

      {/* Login Link */}
      <div className={styles['login-link']}>
        <span>Already have an account? </span>
        <a href='/auth/login' className={styles['login-link-text']}>
          Log in
        </a>
      </div>
    </div>
  );
};

export default RegisterForm;
