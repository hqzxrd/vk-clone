import { changeTheme } from './theme/theme.slice'
import * as userActions from './user/user.action'

export const actions = {
	...userActions,
	changeTheme,
}
