import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetTodoQuery } from '../features/api/apiSlice';
import { colorRemoved, colorSelected, todoStatus } from '../features/filter/filterSlice';


const Footer = () => {
    const { data: todos, isLoading } = useGetTodoQuery();
    const incompleteTodos = todos?.filter(todo => todo?.completed === false);
    const dispatch = useDispatch();
    const { color: colorArr, status } = useSelector(state => state.filter)

    const numberOfTodos = (todos) => {
        switch (todos) {
            case 0:
                return 'No task'
            case 1:
                return '1 task'
            default:
                return `${todos} tasks`;
        }
    }

    const handleStatus = (filterByStatus) => {
        dispatch(todoStatus(filterByStatus))
    }

    const handleFilterColor = (color) => {

        if (colorArr.includes(color)) {
            dispatch(colorRemoved(color))
        } else {
            dispatch(colorSelected(color))
        }
    }



    return (
        <div className="mt-4 flex justify-between text-xs text-gray-500">
            {
                isLoading ? <p>Loading...</p> :
                    <p>{numberOfTodos(incompleteTodos?.length)} left</p>
            }
            <ul className="flex space-x-1 items-center text-xs">
                <li className={`cursor-pointer ${status === 'all' && 'font-bold'} `} onClick={() => handleStatus('all')}>All</li>
                <li>|</li>
                <li className={`cursor-pointer ${status === 'incomplete' && 'font-bold'} `} onClick={() => handleStatus('incomplete')}>Incomplete</li>
                <li>|</li>
                <li className={`cursor-pointer ${status === 'complete' && 'font-bold'} `} onClick={() => handleStatus('complete')}>Complete</li>
                <li></li>
                <li></li>
                <li
                    onClick={() => handleFilterColor('green')}
                    className={`h-3 w-3 border-2 border-green-500 md:hover:bg-green-500 rounded-full cursor-pointer ${colorArr.includes('green') && 'bg-green-500'} `}
                ></li>
                <li
                    onClick={() => handleFilterColor('red')}
                    className={`h-3 w-3 border-2 border-red-500 md:hover:bg-red-500 rounded-full cursor-pointer ${colorArr.includes('red') && 'bg-red-500'}`}
                ></li>
                <li
                    onClick={() => handleFilterColor('yellow')}
                    className={`h-3 w-3 border-2 border-yellow-500 md:hover:bg-yellow-500 rounded-full cursor-pointer ${colorArr.includes('yellow') && 'bg-yellow-500'}`}
                ></li>
            </ul>
        </div>
    );
};

export default Footer;