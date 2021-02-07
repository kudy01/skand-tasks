 import {
	CHANGE_SEARCH_FIELD,
 } from './user.types.js';


export const setSearchField = (text) => {
	return {
		type: CHANGE_SEARCH_FIELD,
		payload: text
	}
}
  
export const REQUEST_API_DATA = "REQUEST_API_DATA";
export const RECEIVE_API_DATA = "RECEIVE_API_DATA";

export const requestApiData = () => ({ type: REQUEST_API_DATA });
export const receiveApiData = data => ({ type: RECEIVE_API_DATA, data });