const { createSlice } = require("@reduxjs/toolkit")

// initial state
const initialState = {
    status: 'all',
    color: [],
}


const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        todoStatus: (state, action) => {
            state.status = action.payload;
        },

        colorSelected: (state, action) => {
            state.color.push(action.payload)
        },

        colorRemoved: (state, action) => {
            state.color = state.color.filter(c => c !== action.payload)
        }
    }
})

export default filterSlice.reducer;
export const { todoStatus, colorSelected, colorRemoved } = filterSlice.actions