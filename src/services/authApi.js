import { api } from './api';
import { setCredentials, loggedOut } from '../features/auth/authSlice';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ username, password }) => ({
        url: '',
        method: 'POST',
        params: { action: 'login' },
        body: { username, password },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data && data.ok && data.user) {
            dispatch(setCredentials({ user: data.user, token: data.token }));
          }
        } catch {
          // Error handled in component
        }
      },
    }),

    register: builder.mutation({
      query: ({ username, email, password }) => ({
        url: '',
        method: 'POST',
        params: { action: 'register' },
        body: { username, email, password },
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: '',
        method: 'GET',
        params: { action: 'logout' },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch {
          // Ignorar errores de red en logout
        } finally {
          dispatch(loggedOut());
          dispatch(api.util.resetApiState());
        }
      },
    }),

    checkSession: builder.query({
      query: () => ({
        url: '',
        params: { action: 'check_session' },
      }),
    }),

    deleteAccount: builder.mutation({
      query: () => ({
        url: '',
        method: 'POST',
        params: { action: 'delete_account' },
      }),
      invalidatesTags: ['User'],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch {
          // Ignorar
        } finally {
          dispatch(loggedOut());
          dispatch(api.util.resetApiState());
        }
      },
    }),

    adminDeleteUser: builder.mutation({
      query: (userId) => ({
        url: '',
        method: 'POST',
        params: { action: 'admin_delete_user' },
        body: { user_id: userId },
      }),
      invalidatesTags: ['User'],
    }),

    getUsersPerformance: builder.query({
      query: () => ({
        url: '',
        params: { action: 'get_all_users_performance' },
      }),
      providesTags: ['User'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useCheckSessionQuery,
  useLazyCheckSessionQuery,
  useDeleteAccountMutation,
  useAdminDeleteUserMutation,
  useGetUsersPerformanceQuery,
} = authApi;
