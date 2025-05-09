import { apiSlice } from "../apiSlice"

const PROSPECT_URL = "/prospect"

export const prospectApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Create a new prospect
        createProspect: builder.mutation({
            query: (data) => ({
                url: `${PROSPECT_URL}`,
                method: "POST",
                body: data,
                credentials: "include",
            }),
        }),

        // Get all prospects
        getProspects: builder.query({
            query: () => ({
                url: `${PROSPECT_URL}`,
                method: "GET",
                credentials: "include",
            }),
        }),

        // Get a single prospect by ID
        getProspectById: builder.query({
            query: (id) => ({
                url: `${PROSPECT_URL}/${id}`,
                method: "GET",
                credentials: "include",
            }),
        }),

        // Update a prospect
        updateProspect: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `${PROSPECT_URL}/${id}`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
        }),

        // Delete a prospect
        deleteProspect: builder.mutation({
            query: (id) => ({
                url: `${PROSPECT_URL}/${id}`,
                method: "DELETE",
                credentials: "include",
            }),
        }),
    }),
})

export const {
    useCreateProspectMutation,
    useGetProspectsQuery,
    useGetProspectByIdQuery,
    useUpdateProspectMutation,
    useDeleteProspectMutation,
} = prospectApiSlice
