import React from 'react';
import { useSelector } from 'react-redux';
import { useGetTodoQuery } from '../features/api/apiSlice';
import Error from '../utilities/Error';
import Todo from './Todo';

const Todos = () => {
    const { data: todos, isError, isLoading } = useGetTodoQuery();
    const { status, color } = useSelector(state => state.filter);
    const filterByStatus = todo => {
        switch (status) {
            case 'complete':
                return todo.completed;
            case 'incomplete':
                return !todo.completed;
            default:
                return true;
        }
    }

    const filterByColor = todo => {
        if (color.length > 0) {
            return color.includes(todo?.priority_color)
        } else {
            return true;
        }
    }

    // decide what to do
    let content = null;
    if (isLoading) content = <div>Loading...</div>
    if (!isLoading && isError) content = <Error />
    if (!isLoading && !isError && todos?.length === 0) content = <div>No data found</div>
    if (!isLoading && !isError && todos?.length > 0)
        content = todos
            .filter(filterByStatus)
            .filter(filterByColor)
            .map(todo => <Todo key={todo.id} todo={todo} />)

    return (
        <div
            className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto"
        >

            {content?.length===0 ? 'No data found' : content}


        </div>
    );
};

export default Todos;