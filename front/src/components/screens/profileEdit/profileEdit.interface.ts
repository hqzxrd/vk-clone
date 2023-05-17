import { IRegisterFields } from '../authForm/auth.interface'

export interface IUpdateFields
	extends Omit<IRegisterFields, 'password' | 'confirm' | 'email' | `code`>,
		IUserAdditionalInfoFields {}

export interface IUserAdditionalInfoFields {
	city: string | null
	status: string | null
	avatar: string
}
