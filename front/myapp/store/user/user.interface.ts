import { IUser } from '@/types/user.types'

export interface IUserState {
	email: string
	isAdmin: string
}

export interface ITokens {
	accessToken: string
	refreshToken: string
}

export interface IInitialState {
	user: IUser | null
	isLoading: boolean
}

export interface IEmailPassord {
	email: string
	password: string
}

export interface IAuthResponse extends ITokens {
	user: IUser
}
