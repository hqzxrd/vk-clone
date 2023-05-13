import {
	FormState,
	UseFormHandleSubmit,
	UseFormRegister,
	UseFormWatch,
} from 'react-hook-form'

export interface propsRegInput {
	reg: UseFormRegister<IAuthFields>
}

export interface propsForInput extends propsRegInput {
	handleSubmit: UseFormHandleSubmit<IAuthFields>
	formState: FormState<IAuthFields>
	watch: UseFormWatch<IAuthFields>
}

export interface IConfirmField {
	confirm: string
}

export interface IEmailPassordFields {
	email: string
	password: string
}

export type TypeGender = `male` | `female`

export interface IUserInfoFields {
	name: string
	surname: string
	day: string
	month: string
	year: string
	gender: string
}

export interface IUserExInfoField {
	city?: string
	status?: string
}

export interface IAuthFields
	extends IEmailPassordFields,
		IUserInfoFields,
		IConfirmField {}

export interface UserFields extends IAuthFields, IUserExInfoField {}
