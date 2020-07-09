import { createSlice } from '@reduxjs/toolkit';

export const filteringSlice = createSlice({
  name: 'filtering',
  initialState: {
    number: '',
  },
  reducers: {
    setNumber: (state, action) => {
      state.number = action.payload;
    },
  },
});

export const { setNumber } = filteringSlice.actions;

export default filteringSlice.reducer;