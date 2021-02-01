
import {
	REQUEST_CURRENTUSER_PENDING,
	REQUEST_CURRENTUSER_SUCCESS,
	REQUEST_CURRENTUSER_FAILED
} from './currentUser.types.js';

const initialStateCurrentUser = {
	isPending: false,
	user: {},
	error: ''
}
export const requestCurrentUser = (state = initialStateCurrentUser, action = {}) => {
	switch(action.type) {
		case REQUEST_CURRENTUSER_PENDING:
			return Object.assign({}, state,{ isPending: true })
		case REQUEST_CURRENTUSER_SUCCESS:
			return Object.assign({}, state,{ user: action.payload, isPending: false })
		case REQUEST_CURRENTUSER_FAILED:
			return Object.assign({}, state,{ error: action.payload, isPending: false })
		default:
			return state;
	}
}
