import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { NewEvent } from './typs';

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

// טיפוס לאירוע אחד

export const eventApi = createApi({
  reducerPath: 'eventApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    credentials: 'include',
  }),
  tagTypes: ['Event'],
  endpoints: (builder) => ({
    getEvents: builder.query<Event[], void>({
      query: () => '/events',
      providesTags: ['Event'],
    }),
    addEvent: builder.mutation<Event, NewEvent>({
      query: (newEvent) => ({
        url: '/events',
        method: 'POST',
        body: newEvent,
      }),
      invalidatesTags: ['Event'],
    }),
    deleteEvent: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/events/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Event'],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useAddEventMutation,
  useDeleteEventMutation,
} = eventApi;
