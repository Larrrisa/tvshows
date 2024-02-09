import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Card {
  id: number;
  name: string;
  summary: string;
  image: any;
}

export const showApi = createApi({
  reducerPath: "showApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.tvmaze.com/shows" }),
  endpoints: (builder) => ({
    fetchMainInfo: builder.query<Card[], void>({
      query: () => `?page=0`,
    }),
  }),
});

export const { useFetchMainInfoQuery } = showApi;
