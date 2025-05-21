import { apiSlice } from "../apiSlice";

const CLIENT_URL = "/client";

export const clientApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new client
    createClient: builder.mutation({
      query: (data) => ({
        url: `${CLIENT_URL}`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    // Get all clients
    getClients: builder.query({
      query: () => ({
        url: `${CLIENT_URL}`,
        method: "GET",
        credentials: "include",
      }),
    }),

    // Get a single client by ID
    getClientById: builder.query({
      query: (id) => ({
        url: `${CLIENT_URL}/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),

    // Update a client
    updateClient: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${CLIENT_URL}/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    // Delete a client
    deleteClient: builder.mutation({
      query: (id) => ({
        url: `${CLIENT_URL}/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateClientMutation,
  useGetClientsQuery,
  useGetClientByIdQuery,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = clientApiSlice;
