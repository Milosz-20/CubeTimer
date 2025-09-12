import { User } from '@app-types/user';
import { apiSlice } from '@app/api/apiSlice';

interface LoginDto {
  login: string;
  password: string;
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<{ message: string }, LoginDto>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials
      })
    }),
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({ url: '/auth/logout', method: 'POST' })
    }),
    getMe: builder.query<User, void>({ query: () => '/users/me' })
  })
});

export const { useLoginMutation, useLogoutMutation, useGetMeQuery } =
  authApiSlice;
