import { configureStore } from '@reduxjs/toolkit';
import noteSlice from './noteSlice';

export default configureStore({
    reducer: {
        note: noteSlice,
    },
});
