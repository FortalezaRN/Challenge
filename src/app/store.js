import { configureStore } from '@reduxjs/toolkit';
import { numberReducer } from '../ducks/numbers';

const store = configureStore({
  reducer: {
    numbers: numberReducer.reducer,
  },
});

export default store;