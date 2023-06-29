import { IUserDto } from '@/types/auth.types'

export interface IInitialState {
	user: IUserDto
	isAuth: true | null
	isLoading: boolean
	notifications: INotifications
}

export interface INotifications {
	notificationCount: number
	notificationIncomingCount: number
}
