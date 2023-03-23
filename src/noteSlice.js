import { createSlice } from '@reduxjs/toolkit';

export const TOKEN_TIME_OUT = 600*1000;

export const noteSlice = createSlice({
    name: 'note',
    initialState: {
        words : [],
        file : null
    },
    reducers: {
        setWords : (state, action) => {
            state.words = action.payload;
        },
        uploade : (state, action) => {
            state.file = action.payload;
        }
    }
})


export default noteSlice.reducer;
export const {setWords} = noteSlice.actions;
export const {uploade} = noteSlice.actions;