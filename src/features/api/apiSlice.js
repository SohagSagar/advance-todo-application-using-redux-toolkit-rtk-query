import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath:'api',
    baseQuery:fetchBaseQuery({
        // baseUrl:'http://localhost:8000'
        baseUrl:'https://react-redux-json-server.herokuapp.com'
    }),
    tagTypes:['todos'],

    endpoints:(builder)=>({

        getTodo: builder.query({
            query:()=>'/todos',
            providesTags:()=>['todos']
        }),

        addTodo: builder.mutation({
            query:(data)=>({
                url:'/todos',
                method:'POST',
                body:data,
            }),
            invalidatesTags:()=>['todos']
        }),

        addTodoPriority: builder.mutation({
            query:({id,data})=>({
                url:`/todos/${id}`,
                method:'PATCH',
                body:data,
                headers:{
                    'Content-Type':' application/json'
                }
            }),
            invalidatesTags:()=>['todos']
        }),
        addTodoCompleteStatus: builder.mutation({
            query:({id,data})=>({
                url:`/todos/${id}`,
                method:'PATCH',
                body:data,
                headers:{
                    'Content-Type':' application/json'
                }
            }),
            invalidatesTags:()=>['todos']
        }),
        updateTodo:builder.mutation({
            query:({id,data})=>({
                url:`/todos/${id}`,
                method:'PATCH',
                body:data
            }),
            invalidatesTags:()=>['todos']
        }),
        deleteTodo: builder.mutation({
            query:(id)=>({
                url:`/todos/${id}`,
                method:'DELETE'
            }),
            invalidatesTags:()=>['todos']
        }),
    })
});

export const {useAddTodoMutation,useGetTodoQuery,useAddTodoPriorityMutation,useAddTodoCompleteStatusMutation,useDeleteTodoMutation,useUpdateTodoMutation} =apiSlice