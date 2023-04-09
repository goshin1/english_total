import { createSlice } from '@reduxjs/toolkit';

export const TOKEN_TIME_OUT = 600*1000;

export const noteSlice = createSlice({
    name: 'note',
    initialState: {
        words : [],
        deletes : [],
        updates : []
    },
    reducers: {
        setWords : (state, action) => {
            state.words = action.payload;
        },
        deleteWord : (state, action) => {
            state.deletes = [ ...state.deletes, action.payload];
        },
        deleteWordCancel : (state, action) => {
            state.deletes = state.deletes.filter(num => num !== action.payload);
        },
        updateWord : (state, action) => {
            state.updates = [ ...state.updates, action.payload]
        }
    }
})


export default noteSlice.reducer;
export const {setWords} = noteSlice.actions;
export const {deleteWord} = noteSlice.actions;
export const {deleteWordCancel} = noteSlice.actions;
export const {updateWord} = noteSlice.actions;