import { reducer as userReducer } from './user/user.slice'
import { reducer as toastrReducer } from 'react-redux-toastr'

export const reducers = {
	toastr: toastrReducer,
	user: userReducer,
}
