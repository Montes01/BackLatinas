import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Comment } from "../types/types";
export const latinasApi = createApi({
    reducerPath: "latinasApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
    endpoints: (builder) => ({
        getComments: builder.query<Comment[], {}>({
            query: () => "comments",
        }),
    }),
});

export const { useGetCommentsQuery } = latinasApi;