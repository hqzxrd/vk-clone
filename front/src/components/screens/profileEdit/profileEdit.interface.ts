import { IRegisterFields } from '../authForm/auth.interface'
import { IUser } from '@/types/user.types'

export interface IUpdateFields
	extends Omit<IRegisterFields, 'password' | 'confirm' | 'email' | `code`>,
		IUserAdditionalInfoFields {}

export interface IUserAdditionalInfoFields {
	city: string | null
	status: string | null
	nickname: string | null
}

export interface IUpdateFieldsDto
	extends Omit<
			IUser,
			| 'createDate'
			| 'avatar'
			| 'countFriends'
			| 'countIncomingRequests'
			| 'typeRelationship'
		>,
		IUserAdditionalInfoFields {}
