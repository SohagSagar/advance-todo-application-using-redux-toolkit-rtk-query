import React from 'react';
import { useAddTodoCompleteStatusMutation, useDeleteTodoMutation, useGetTodoQuery } from '../features/api/apiSlice';

import Form from './Form';

const Header = () => {
    const { data: todos, isLoading } = useGetTodoQuery();
    const [addTodoCompleteStatus, { isLoading: completeLoading, isError: completeError }] = useAddTodoCompleteStatusMutation();
    const [deleteTodo, { isLoading: deleteLoading, isError: deleteError }] = useDeleteTodoMutation()

    // handle complete todos
    const handleCompleteTodos = () => {
        const incompleteTodos = todos?.filter(todo => !todo?.completed)
        if (incompleteTodos) {
            incompleteTodos.map(todo => {
                return addTodoCompleteStatus({
                    id: todo?.id,
                    data: {
                        'completed': true
                    }
                })
            })
        }
    }

    // /handle clear complete todos
    const handleClearTodos = () => {
        const completeTodos = todos?.filter(todo => todo?.completed)
        if (completeTodos) {
            completeTodos.map(todo => {
                return deleteTodo(todo?.id)
            })
        }
    }


    // decide what to render for complete all todos
    let completedContent = null;
    if (completeLoading) completedContent = <span>Loading...</span>
    if (!completeLoading && completeError) completedContent = <span className='text-red-600'>There was an error!</span>
    if (!completeLoading && !completeError) completedContent = <span aria-disabled={isLoading} onClick={handleCompleteTodos}>Complete All Tasks</span>

    // decide what to render for clear all completed todos
    let deletedContent = null;
    if (deleteLoading) deletedContent = <li>Loading...</li>
    if (!deleteLoading && deleteError) deletedContent = <li className='text-red-600'>There was an error!</li>
    if (!deleteLoading && !deleteError) deletedContent = <li onClick={handleClearTodos} className="cursor-pointer">Clear completed</li>

    return (
        <div>
            <Form />

            <ul className="flex justify-between my-4 text-xs text-gray-500">
                <li className="flex space-x-1 cursor-pointer">
                    <img
                        className="w-4 h-4"
                        src="./images/double-tick.png"
                        alt="Complete"
                    />

                    {completedContent}

                </li>
                
                {deletedContent}

            </ul>

        </div>
    );
};

export default Header;