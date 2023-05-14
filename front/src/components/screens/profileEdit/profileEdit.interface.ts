import { IRegisterFieldsClient } from '../authForm/auth.interface'

export interface IUpdateProfileFieldsClient
	extends IRegisterFieldsClient,
		IUseradditionalInfoFields {}

export interface IUseradditionalInfoFields {
	city: string | null
	status: string | null
}
