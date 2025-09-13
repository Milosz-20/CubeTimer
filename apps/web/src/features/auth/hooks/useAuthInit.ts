import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useGetMeQuery } from '@features/auth/api/authApi';
import { setAuth, setLoading } from '@features/auth/slices/authSlice';
import { setUser, clearUser } from '@store/slices/userSlice';
import { RootState } from '@store/store';

export const useAuthInit = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const hasInitialized = useRef(false);

  const { data: userData, isError, isSuccess } = useGetMeQuery();

  useEffect(() => {
    if (isSuccess && userData) {
      // User jest zalogowany!
      dispatch(setAuth(true));
      dispatch(setUser(userData));
      dispatch(setLoading(false));
      hasInitialized.current = true;
    }
    if (isError) {
      dispatch(setAuth(false));
      dispatch(clearUser());
      dispatch(setLoading(false));
      hasInitialized.current = true;
    }
  }, [isSuccess, isError, userData, dispatch]);

  // Pokazuj loading tylko jeśli nie zakończył się jeszcze pierwszy request
  return { isInitializing: isLoading && !hasInitialized.current };
};
