import { api } from './api';

export const metricsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getHosts: builder.query({
      query: () => ({
        url: '',
        params: { action: 'get_hosts' },
      }),
      transformResponse: (res) => res?.data ?? [],
      providesTags: ['Host'],
    }),

    getMetrics: builder.query({
      query: (hostId = 1) => ({
        url: '',
        params: { action: 'get_metrics', host_id: hostId },
      }),
      // Se conserva el sobre completo: useMetrics usa ok, data, alert_triggered y active_alerts
      providesTags: ['Metric'],
    }),

    getHistory: builder.query({
      query: ({ hostId = 1, startDate = '', endDate = '' }) => ({
        url: '',
        params: {
          action: 'get_history',
          host_id: hostId,
          start_date: startDate,
          end_date: endDate,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetHostsQuery,
  useGetMetricsQuery,
  useGetHistoryQuery,
  useLazyGetHistoryQuery,
} = metricsApi;
