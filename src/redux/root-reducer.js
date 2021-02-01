import { combineReducers } from 'redux';

import { searchUsers, requestUsers } from './user/user.reducer';
import { requestCurrentUser } from './currentUser/currentUser.reducer';

export default combineReducers({searchUsers, requestUsers, requestCurrentUser})
