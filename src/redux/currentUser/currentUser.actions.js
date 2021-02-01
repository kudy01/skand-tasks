import {
	REQUEST_CURRENTUSER_PENDING,
	REQUEST_CURRENTUSER_SUCCESS,
	REQUEST_CURRENTUSER_FAILED
} from './currentUser.types.js';

export const requestCurrentUser = () => (dispatch) => {
	dispatch({type: REQUEST_CURRENTUSER_PENDING})
	getId(dispatch);
}

const getId = (dispatch) => {
    let user = JSON.parse(sessionStorage.getItem('user'));
        const id = fetch('/api/v2/users', { 
            method: 'get',
            headers: {
                'Content-Type': 'application/json', 
                Authorization: localStorage.getItem('token')
                }
            })
            .then((response) => response.json())
            .then((users) => {
                return users.users.filter(data => {
                    return data.email === user.email && data.id
                }
                )
        }); 
        id.then(function(data) { 
            sessionStorage.setItem('currentId', data[0].id)
            fetch(`/api/v2/users/${data[0].id}`, { 
              method: 'get',
              headers: {
                          'Content-Type': 'application/json',
                          'Authorization': localStorage.getItem('token')
              },
            })    
            .then(response => response.json())
            .then(response => {
                    dispatch({type: REQUEST_CURRENTUSER_SUCCESS, payload: response.users})
            })
            .catch(error => dispatch({type: REQUEST_CURRENTUSER_FAILED, payload: error}))
            })

    }