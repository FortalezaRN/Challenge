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
    isAddSucess:false,
    isEditSucess:false,
    isRemoveSucess:false,
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
    editNewNumber: (state, action) =>{
      const itemEdited = action.payload;
      if(localStorage.getItem('listEditedItems') !== null) {
        const listEditedItems = JSON.parse(localStorage.getItem('listEditedItems'))
        const searchItem = listEditedItems.find(el => el.id === itemEdited.id);
        
        if(searchItem){
            const listUpdate = listEditedItems.map(number =>{
              if(number.id === itemEdited.id)
                return {...number, ...itemEdited};
              return number
          });
          localStorage.setItem('listEditedItems', JSON.stringify(listUpdate));
        }
        else
          localStorage.setItem('listEditedItems', JSON.stringify([...listEditedItems, itemEdited]));
        
        
      } else {
        localStorage.setItem('listEditedItems', JSON.stringify([itemEdited]));
      }
      const itemsEditeds = state.items.map(number =>{
        if(number.id === itemEdited.id)
          return {...number, ...itemEdited};
        return number
      });
      state.items = itemsEditeds;
      state.pages = chunk(itemsEditeds, 3);
      state.isEditSucess = true;
    },
    deleteNumber: (state, action) =>{
      const idItem = action.payload;
      if(localStorage.getItem('deleteItems') !== null) {
        const deleteItems = JSON.parse(localStorage.getItem('deleteItems'))
        localStorage.setItem('deleteItems', JSON.stringify([...deleteItems, idItem]));
      } else {
        localStorage.setItem('deleteItems', JSON.stringify([idItem]));
      }
      const newList = state.items.filter(item => item.id !== idItem);
      state.items = newList;
      state.pages = chunk(newList, 3);
      state.isRemoveSucess = true;
    },
    setAddSucess: (state) => {
      state.isAddSucess = false;
    },
    setEditSucess: (state) => {
      state.isEditSucess = false;
    },
    setRemoveSucess: (state) => {
      state.isRemoveSucess = false;
    }
  },
});

const { setNumberSuccess, setNumberLoading, setNumberError } = numberReducer.actions;
export const { setFilterNumber, setPages, setCurrentPage, addNewNumber, setAddSucess, deleteNumber, setRemoveSucess, setEditSucess, editNewNumber } = numberReducer.actions;

export const retrieveNumbers = () => (dispatch) => {
  dispatch(setNumberLoading());

  const fakeTimeout = () => fetch(URL_API)
    .then(response => response.json())
    .then(payload => {
      const retrievedNumbers = Object.values(payload.data);
      let itemsLocalStorage = retrievedNumbers;
      if(localStorage.getItem('newItems') !== null)
        itemsLocalStorage = [ ...retrievedNumbers, ...JSON.parse(localStorage.getItem('newItems'))]
      if(localStorage.getItem('deleteItems') !== null){
        const deletedItems = JSON.parse(localStorage.getItem('deleteItems'))
        itemsLocalStorage = itemsLocalStorage.filter(number => !deletedItems.includes(number.id))
      }
      if(localStorage.getItem('listEditedItems') !== null){
        const listEditedItems = JSON.parse(localStorage.getItem('listEditedItems'))
        itemsLocalStorage = itemsLocalStorage.map(number =>{
          const searchItem = listEditedItems.find(el => el.id === number.id);
          if(!!searchItem)
            return {...number, ...searchItem};
          return number
        });
      }
      dispatch(setNumberSuccess(itemsLocalStorage));
      dispatch(setPages(itemsLocalStorage));
    }).catch(() => dispatch(setNumberError()));
  setTimeout(fakeTimeout, 1000)
};

export default numberReducer.reducer;