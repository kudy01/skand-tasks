
 import {
 	CHANGE_SEARCH_FIELD,
 } from './user.types.js';
import { RECEIVE_API_DATA } from "./user.actions";

const initialStateSearch = {
	searchField: ''
}

export const setSearchField = (state = initialStateSearch, action = {}) => {
	switch(action.type) {
		case CHANGE_SEARCH_FIELD:			
			return {
				...state,
				searchField: action.payload
			}
		default:
			return state; 
	}
}

export default (state = {}, { type, data }) => {
  switch (type) {
    case RECEIVE_API_DATA:
      return data;
    default:
      return state;
  }
};

