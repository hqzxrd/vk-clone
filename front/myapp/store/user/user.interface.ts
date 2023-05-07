import { IUser } from '@/types/user.types'

import { IEmailPassordFields } from '@/components/screens/authForm/auth.interface'

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

export interface IUserInfoFields {
	name: string
	surname: string
	birthday: string
	gender: string
}

export interface IUserDto extends IUserInfoFields, IEmailPassordFields {}

export interface ICodeEmailDto {
	code: number
	email: string
}

export interface IAuthResponse extends ITokens {
	user: IUser
}
