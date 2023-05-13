import { IUserDto } from '@/types/auth.types'

export interface IInitialState {
	user: IUserDto
	isAutorized: boolean | null
	isLoading: boolean
}
