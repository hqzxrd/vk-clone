import { IUserDto } from '@/types/auth.types'

export interface IInitialState {
	user: IUserDto
	isAuth: true | null
	isLoading: boolean
}
