import { combineReducers } from 'redux';

import data, { setSearchField } from './user/user.reducer';

export default combineReducers({ data, setSearchField})
