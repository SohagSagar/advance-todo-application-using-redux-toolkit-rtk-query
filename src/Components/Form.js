import React, { useState } from 'react';
import { useAddTodoMutation } from '../features/api/apiSlice';
import addTodoNote from '../resourses/images/notes.png';
import Error from '../utilities/Error';

const Form = () => {
    const [addTodo, { isError, isLoading }] = useAddTodoMutation();
    const [todoText, setTodoText] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            todo: todoText,
            completed: false,
            priority_color: ''
        }
        addTodo(data);
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="flex items-center bg-gray-100 px-4 py-4 rounded-md"  >
                <img
                    src={addTodoNote}
                    className="w-6 h-6"
                    alt="Add todo"
                />
                <input
                    required
                    onChange={e => setTodoText(e.target.value)}
                    type="text"
                    placeholder="Type your todo"
                    className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
                />

                <button disabled={isLoading} type="submit" >Add</button>
            </form>
            {
                isError && <Error />  
            }
        </div>
    );
};

export default Form;