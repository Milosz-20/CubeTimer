import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query/react';
import { logout } from '@features/auth/slices/authSlice';
import { clearUser } from '@store/slices/userSlice';

const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3333/api',
    credentials: 'include'
  });

  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    api.dispatch(logout());
    api.dispatch(clearUser());
    console.log('User is not authenticated :(');
  }

  return result;
};

export { baseQueryWithAuth };
