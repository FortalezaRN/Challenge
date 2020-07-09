import { configureStore } from '@reduxjs/toolkit';
import { numbersSlice } from '../ducks/PhonesSlices';
import { filteringSlice } from '../ducks/FilteringSlice';

const store = configureStore({
  reducer: {
    numbers: numbersSlice.reducer,
    filtering: filteringSlice.reducer,
  },
});

window.store = store;

export default store;