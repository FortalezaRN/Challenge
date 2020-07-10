import { createSlice } from '@reduxjs/toolkit';
import chunk from 'lodash.chunk';
import { uuid } from 'uuidv4';

import { URL_API } from '../../consts';

export const numberReducer = createSlice({
  name: 'numbers',
  initialState: {
    isLoading: false,
    isError: false,
    filterNumber: '',
    totalPages: 0,
    currentPage: 0,
    pages: [],
    items: [],
    isAddSucess:false
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
    setPages: (state, action) =>{ // Fake Pagination
      state.pages = chunk(action.payload, 3);
    },
    setCurrentPage: (state, action) =>{
      state.currentPage = action.payload
    },
    setFilterNumber: (state, action) => { // when the api came 
      state.filterNumber = action.payload;
    },
    addNewNumber: (state, action) =>{
      const newItem = {id: uuid(), ...action.payload};
      if(localStorage.getItem('newItems') !== null) {
        const newItems = JSON.parse(localStorage.getItem('newItems'))
        localStorage.setItem('newItems', JSON.stringify([...newItems, newItem]));
      } else {
        localStorage.setItem('newItems', JSON.stringify([newItem]));
      }
      const newItems = Object.assign({}, state, { items: [...state.items, newItem]});
      state.items = newItems.items;
      state.pages = chunk(newItems.items, 3);
      state.isAddSucess = true;
    },
    setAddSucess: (state) => {
      state.isAddSucess = false;
    }
  },
});

const { setNumberSuccess, setNumberLoading, setNumberError } = numberReducer.actions;
export const { setFilterNumber, setPages, setCurrentPage, addNewNumber, setAddSucess } = numberReducer.actions;

export const retrieveNumbers = () => (dispatch) => {
  dispatch(setNumberLoading());

  const fakeTimeout = () => fetch(URL_API)
    .then(response => response.json())
    .then(payload => {
      const retrievedNumbers = Object.values(payload.data);
      let itemsLocalStorage = {}
      if(localStorage.getItem('newItems') !== null)
        itemsLocalStorage = JSON.parse(localStorage.getItem('newItems'))
      dispatch(setNumberSuccess([ ...retrievedNumbers, ...itemsLocalStorage ]));
      dispatch(setPages([ ...retrievedNumbers, ...itemsLocalStorage ]));
    }).catch(() => dispatch(setNumberError()));
  setTimeout(fakeTimeout, 1000)
};

export default numberReducer.reducer;