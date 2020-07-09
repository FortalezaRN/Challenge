import { createSlice } from '@reduxjs/toolkit';
import { URL_API } from '../consts';

export const numbersSlice = createSlice({
  name: 'numbers',
  initialState: {
    isLoading: false,
    isError: false,
    items: [],
  },
  reducers: {
    setNumberLoading: (state) => {
      state.isError = false;
      state.isLoading = true;
    },
    setNumberSuccess: (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.items = action.payload;
    },
    setNumberError: (state) => {
      state.isError = true;
      state.isLoading = false;
    },
  },
});

const { setNumberSuccess, setNumberLoading, setNumberError } = numbersSlice.actions;

export const retrieveNumbers = () => (dispatch) => {
  dispatch(setNumberLoading());

  const fakeTimeout = () => fetch(URL_API)
    .then(response => response.json())
    .then(payload => {
      const retrievedNumbers = Object.values(payload.data);
      dispatch(setNumberSuccess(retrievedNumbers));
    }).catch(() => dispatch(setNumberError()));
  setTimeout(fakeTimeout, 1000)
};

window.championsSlice = numbersSlice;

export default numbersSlice.reducer;