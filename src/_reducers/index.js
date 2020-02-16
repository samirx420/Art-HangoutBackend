import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { notices } from './notice.reducer';
import { alert } from './alert.reducer';
import { comments } from './comment.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  notices,
  alert,
  comments
});

export default rootReducer;