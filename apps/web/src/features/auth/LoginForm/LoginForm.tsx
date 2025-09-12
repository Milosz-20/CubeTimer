import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation, authApiSlice } from '@features/auth/api/authApi';
import { setAuth } from '@features/auth/slices/authSlice';
import { setUser as setUserData } from '@store/slices/userSlice';
import { AppDispatch } from '@store/store';

import styles from './LoginForm.module.scss';
import { Button } from '@components/ui/Button';
import { Mail, Lock, ArrowLeft } from 'lucide-react';

const LoginForm: React.FC = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');

  const errRef = useRef<HTMLDivElement>(null);
  const [errMsg, setErrMsg] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [login, { isLoading }] = useLoginMutation();

  const handleGoBack = () => {
    navigate('/timer');
  };

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ login: user, password: pwd }).unwrap();
      dispatch(setAuth(true));

      // Fetch user data after successful login
      try {
        const userData = await dispatch(
          authApiSlice.endpoints.getMe.initiate()
        ).unwrap();
        dispatch(setUserData(userData));
      } catch (userErr) {
        console.error('Failed to fetch user data after login:', userErr);
      }

      setUser('');
      setPwd('');
      navigate('/timer');
    } catch (err: any) {
      if (!err.status) {
        setErrMsg('No Server Response');
      } else if (err.status === 403) {
        setErrMsg('Invalid credentials');
      } else if (err.status === 400) {
        setErrMsg('Please fill in all required fields');
      } else {
        setErrMsg('Login Failed');
      }
    }
  };

  const handleUserInput = (e: any) => setUser(e.target.value);
  const handlePwdInput = (e: any) => setPwd(e.target.value);

  const content = (
    <div className={styles.container}>
      <>
        {isLoading ? (
          <section>
            <div className={styles.header}>
              <h1>Logging in...</h1>
              <p>Please wait while we sign you in</p>
            </div>
          </section>
        ) : (
          <section>
            <div className={styles.header}>
              <div>
                <Button
                  icon={<ArrowLeft size={24} />}
                  borderRd='1rem'
                  className={styles.back}
                  onClick={handleGoBack}
                />
                <h1>Log in</h1>
              </div>
              <p>Sign in to an existing account</p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Login */}
              <div className={styles['form-group']}>
                <Mail className={styles['input-icon']} size={20} />
                <input
                  type='text'
                  id='text'
                  ref={userRef}
                  value={user}
                  onChange={handleUserInput}
                  placeholder='Username or email address'
                  autoComplete='email'
                  required
                />
              </div>

              {/* Password */}
              <div className={styles['form-group']}>
                <Lock className={styles['input-icon']} size={20} />
                <input
                  type='password'
                  id='password'
                  ref={pwdRef}
                  value={pwd}
                  onChange={handlePwdInput}
                  placeholder='Password'
                  autoComplete='password'
                  required
                />
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
                disabled={isLoading}
              >
                Log in
              </button>
            </form>

            {/* Register Link */}
            <div className={styles['register-link']}>
              <span>Want to create an account? </span>
              <a href='/auth/register' className={styles['login-link-text']}>
                Register
              </a>
            </div>
          </section>
        )}
      </>
    </div>
  );

  return content;
};

export default LoginForm;
