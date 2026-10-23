import { api } from './api';

// El backend responde { ok, data }. Se desenvuelve aquí para que los
// componentes reciban directamente el arreglo.
const unwrapList = (res) => res?.data ?? [];

export const thresholdsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getThresholds: builder.query({
      query: (hostId = 1) => ({
        url: '',
        params: { action: 'get_thresholds', host_id: hostId },
      }),
      transformResponse: unwrapList,
      providesTags: ['Threshold'],
    }),

    createThreshold: builder.mutation({
      query: (body) => ({
        url: '',
        method: 'POST',
        params: { action: 'create_threshold' },
        body,
      }),
      invalidatesTags: ['Threshold', 'Alert'],
    }),

    updateThreshold: builder.mutation({
      query: (body) => ({
        url: '',
        method: 'POST',
        params: { action: 'update_threshold' },
        body,
      }),
      invalidatesTags: ['Threshold', 'Alert'],
    }),

    deleteThreshold: builder.mutation({
      query: (thresholdId) => ({
        url: '',
        method: 'POST',
        params: { action: 'delete_threshold' },
        body: { threshold_id: thresholdId },
      }),
      invalidatesTags: ['Threshold', 'Alert'],
    }),

    getAlerts: builder.query({
      query: () => ({
        url: '',
        params: { action: 'get_alerts' },
      }),
      transformResponse: unwrapList,
      providesTags: ['Alert'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetThresholdsQuery,
  useCreateThresholdMutation,
  useUpdateThresholdMutation,
  useDeleteThresholdMutation,
  useGetAlertsQuery,
} = thresholdsApi;
