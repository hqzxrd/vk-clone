import { reducer as themeReducer } from './theme/theme.slice'
import { reducer as userReducer } from './user/user.slice'

export const reducers = {
	user: userReducer,
	theme: themeReducer,
}
