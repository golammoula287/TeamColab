import { apiSlice } from "../apiSlice"

const PROJECT_URL = "/project"  // You can adjust this URL based on your backend routes

export const projectApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Create a new project
        createProject: builder.mutation({
            query: (data) => ({
                url: `${PROJECT_URL}`,
                method: "POST",
                body: data,
                credentials: "include",  // Assuming your API requires authentication via cookies
            }),
        }),

        // Get all projects
        getProjects: builder.query({
            query: () => ({
                url: `${PROJECT_URL}`,
                method: "GET",
                credentials: "include",  // Assuming your API requires authentication via cookies
            }),
        }),

        // Get a single project by ID
        getProjectById: builder.query({
            query: (id) => ({
                url: `${PROJECT_URL}/${id}`,
                method: "GET",
                credentials: "include",  // Assuming your API requires authentication via cookies
            }),
        }),

        // Update a project
        updateProject: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `${PROJECT_URL}/${id}`,
                method: "PUT",
                body: data,
                credentials: "include",  // Assuming your API requires authentication via cookies
            }),
        }),

        // Delete a project
        deleteProject: builder.mutation({
            query: (id) => ({
                url: `${PROJECT_URL}/${id}`,
                method: "DELETE",
                credentials: "include",  // Assuming your API requires authentication via cookies
            }),
        }),

        // Add a cost to a project
        addCostToProject: builder.mutation({
            query: ({ id, cost }) => ({
                url: `${PROJECT_URL}/${id}/costs`,
                method: "POST",
                body: cost,
                credentials: "include",  // Assuming your API requires authentication via cookies
            }),
        }),

        // Update a specific cost in a project
        updateCost: builder.mutation({
            query: ({ projectId, costId, costData }) => ({
                url: `${PROJECT_URL}/${projectId}/costs/${costId}`,
                method: "PUT",
                body: costData,
                credentials: "include",  // Assuming your API requires authentication via cookies
            }),
        }),

        // Delete a specific cost from a project
        deleteCost: builder.mutation({
            query: ({ projectId, costId }) => ({
                url: `${PROJECT_URL}/${projectId}/costs/${costId}`,
                method: "DELETE",
                credentials: "include",  // Assuming your API requires authentication via cookies
            }),
        }),
    }),
})

export const {
    useCreateProjectMutation,
    useGetProjectsQuery,
    useGetProjectByIdQuery,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
    useAddCostToProjectMutation,
    useUpdateCostMutation,
    useDeleteCostMutation,
} = projectApiSlice
