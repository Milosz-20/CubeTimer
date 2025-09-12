import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useGetMeQuery } from '@features/auth/api/authApi';
import { setAuth, setLoading } from '@features/auth/slices/authSlice';
import { setUser, clearUser } from '@store/slices/userSlice';

export const useAuthInit = () => {
  const dispatch = useDispatch();

  const {
    data: userData,
    isLoading: queryLoading,
    isError,
    isSuccess
  } = useGetMeQuery();

  useEffect(() => {
    if (isSuccess && userData) {
      // User jest zalogowany!
      dispatch(setAuth(true));
      dispatch(setUser(userData));
      dispatch(setLoading(false));
    }
    if (isError) {
      dispatch(setAuth(false));
      dispatch(clearUser());
      dispatch(setLoading(false));
    }
  }, [isSuccess, isError, userData, dispatch]);

  return { isInitializing: queryLoading };
};
