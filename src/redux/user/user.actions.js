import {
	CHANGE_SEARCH_FIELD,
	REQUEST_USERS_PENDING,
	REQUEST_USERS_SUCCESS,
	REQUEST_USERS_FAILED
} from './user.types.js';


export const setSearchField = (text) => {
	return {
		type: CHANGE_SEARCH_FIELD,
		payload: text
	}
}


export const requestUsers = () => (dispatch) => {
	dispatch({type: REQUEST_USERS_PENDING})
	fetch('/api/v2/users', { 
        method: 'get',
        headers: {
            'Content-Type': 'application/json', 
            Authorization: localStorage.getItem('token')
          }
        }) 
		.then(response =>response.json())
		.then(users => dispatch({type: REQUEST_USERS_SUCCESS, payload: users.users}))
		.catch(error => dispatch({type: REQUEST_USERS_FAILED, payload: error}))
}

