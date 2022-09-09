import React from 'react';
import { useAddTodoCompleteStatusMutation, useAddTodoPriorityMutation } from '../features/api/apiSlice';
import deleteImg from '../resourses/images/cancel.png'

const Todo = ({ todo }) => {
    const { id, todo: todoText, completed, priority_color } = todo;
    const [addTodoPriority, { isError, isLoading }] = useAddTodoPriorityMutation();
    const [addTodoCompleteStatus, { }] = useAddTodoCompleteStatusMutation()


    const handlePriority = (PriorityColor) => {

        addTodoPriority({
            id,
            data: {
                'priority_color': PriorityColor
            }
        })
    }

    const handleChangeCompleteStatus = () => {

        addTodoCompleteStatus(
            {
                id,
                data: {
                    completed:!completed
                }
            })
    }



    return (
        <div
            className="flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0"
        >
            <div
                onClick={handleChangeCompleteStatus}
                className={`rounded-full bg-white border-2 border-${completed ? 'green' : 'grey'}-400 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 cursor-pointer`}
            >
                <input
                    type="checkbox"
                    className="opacity-0 absolute rounded-full cursor-pointer"
                />
                {
                    completed &&
                    <svg className=" fill-current w-3 h-3 text-green-500 pointer-events-none cursor-pointer" viewBox="0 0 20 20">
                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                    </svg>
                }
            </div>

            <div className={`select-none flex-1 ${completed && 'line-through'}`}>
                {todoText}
            </div>

            <div
                aria-disabled={isLoading}
                onClick={() => handlePriority('green')}
                className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-green-500 hover:bg-green-500 bg-${priority_color === 'green' && 'green'}-500`}
            ></div>

            <div
                onClick={() => handlePriority('yellow')}
                className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-yellow-500 hover:bg-yellow-500 bg-${priority_color === 'yellow' && 'yellow'}-500`}
            ></div>

            <div
                onClick={() => handlePriority('red')}
                className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-red-500 hover:bg-red-500 bg-${priority_color === 'red' && 'red'}-500`}
            ></div>

            <img
                src={deleteImg}
                className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
                alt="Cancel"
            />
        </div>
    );
};

export default Todo;