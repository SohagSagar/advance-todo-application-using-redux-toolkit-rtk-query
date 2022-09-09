import React from 'react';
import { useGetTodoQuery } from '../features/api/apiSlice';
import Error from '../utilities/Error';
import Todo from './Todo';

const Todos = () => {
    const { data:todos,isError,isLoading,isSuccess } =useGetTodoQuery();

    // decide what to do
    let content=null;
    if(isLoading) content =<div>Loading...</div>
    if(!isLoading && isError) content =<Error/>
    if(!isLoading && !isError && todos?.length===0) content =<div>No data found</div>
    if(!isLoading && !isError && todos?.length>0) content =todos.map(todo=><Todo key={todo.id} todo={todo}/>)

    return (
        <div
            className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto"
        >
            
            {content}


        </div>
    );
};

export default Todos;