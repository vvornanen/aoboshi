import { StatisticsIncrement } from "@vvornanen/aoboshi-core/statistics";
import { IpcApiErrorCode, ipcApi } from "~app/ipcApi";

const statisticsApi = ipcApi.injectEndpoints({
  endpoints: (build) => ({
    findLatestStatisticsIncrement: build.query<
      StatisticsIncrement | null,
      void
    >({
      providesTags: (statisticsIncrement) =>
        statisticsIncrement
          ? [
              { type: "StatisticsIncrement", id: statisticsIncrement.id },
              { type: "LatestStatisticsIncrement" },
            ]
          : [],
      queryFn: async () => {
        try {
          const data = await window.ipcApi.findLatestStatisticsIncrement();
          return { data };
        } catch (error) {
          console.error(error);
          return {
            error: {
              code: IpcApiErrorCode.InternalServerError,
              message: `Fetching latest statistics increment failed: ${error}`,
            },
          };
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const { useFindLatestStatisticsIncrementQuery } = statisticsApi;
