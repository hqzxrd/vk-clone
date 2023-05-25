import { reducer as themeReducer } from './theme/theme.slice'
import { reducer as userReducer } from './user/user.slice'
import { reducer as toastrReducer } from 'react-redux-toastr'

export const reducers = {
	toastr: toastrReducer,
	user: userReducer,
	theme: themeReducer,
}
