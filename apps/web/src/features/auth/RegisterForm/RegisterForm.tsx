import { User, AtSign, Mail, Lock, LockKeyhole } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import styles from './RegisterForm.module.scss';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{2,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NICKNAME_REGEX = /^[a-zA-Z0-9\s-_]{2,30}$/;

const RegisterForm: React.FC = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLDivElement>(null);

  // Username
  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  // Nickname
  const [nickname, setNickname] = useState('');
  const [validNickname, setValidNickname] = useState(false);
  const [nicknameFocus, setNicknameFocus] = useState(false);

  // Email
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  // Password
  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  // Password Match
  const [pwdMatch, setPwdMatch] = useState('');
  const [validPwdMatch, setValidPwdMatch] = useState(false);
  const [pwdMatchFocus, setPwdMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
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
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === pwdMatch;
    setValidPwdMatch(match);
  }, [pwd, pwdMatch]);

  useEffect(() => {
    setErrMsg('');
  }, [user, nickname, email, pwd, pwdMatch]);

  const handleSubmit = (e: any) => {
    console.log(e);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Create Account</h1>
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
            onBlur={(e) => {
              setUserFocus(true);
              // hideInfoModal()
            }}
            placeholder='Username'
            autoComplete='off'
            required
          />
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
            onBlur={(e) => {
              setNicknameFocus(true);
              // hideInfoModal()
            }}
            placeholder='Nickname'
            autoComplete='off'
            required
          />
        </div>
        {/* Email */}
        <div className={styles['form-group']}>
          <Mail className={styles['input-icon']} size={20} />
          <input
            type='text'
            id='email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onBlur={(e) => {
              setEmailFocus(true);
              // hideInfoModal()
            }}
            placeholder='Email Address'
            autoComplete='off'
            required
          />
        </div>
        {/* Password */}
        <div className={styles['form-group']}>
          <Lock className={styles['input-icon']} size={20} />
          <input
            type='text'
            id='password'
            value={pwd}
            onChange={(e) => {
              setPwd(e.target.value);
            }}
            onBlur={(e) => {
              setPwdFocus(true);
              // hideInfoModal()
            }}
            placeholder='Password'
            autoComplete='off'
            required
          />
        </div>
        {/* Repeat Password */}
        <div className={styles['form-group']}>
          <LockKeyhole className={styles['input-icon']} size={20} />
          <input
            type='text'
            id='repeatPassword'
            value={pwdMatch}
            onChange={(e) => {
              setPwdMatch(e.target.value);
            }}
            onBlur={(e) => {
              setPwdMatchFocus(true);
              // hideInfoModal()
            }}
            placeholder='Repeat Password'
            autoComplete='off'
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          className={styles['submit-btn']}
          disabled={!validName || !validNickname || !validEmail || !validPwd || !validPwdMatch}
        >
          Create Account
        </button>
      </form>

      {/* Login Link */}
      <div className={styles['login-link']}>
        <span>Already have an account? </span>
        <a href="/login" className={styles['login-link-text']}>
          Log in
        </a>
      </div>
    </div>
  );
};

export default RegisterForm;
