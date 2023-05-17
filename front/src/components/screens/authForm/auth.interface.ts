import { TypeGender } from '@/types/auth.types'
import {
	FieldValues,
	FormState,
	UseFormHandleSubmit,
	UseFormRegister,
	UseFormWatch,
} from 'react-hook-form'

export interface IPropsHookForm<T extends FieldValues> {
	reg: UseFormRegister<any>
	handleSubmit: UseFormHandleSubmit<T>
	formState: FormState<T>
	watch: UseFormWatch<T>
}

export interface IRegisterFields {
	name: string
	surname: string
	day: string
	month: string
	year: string
	gender: TypeGender
	confirm: string
	email: string
	password: string
	code: string
}
export interface IEmail extends Pick<IRegisterFields, 'email'> {}

export interface ICode extends Pick<IRegisterFields, 'code'> {}

export interface IPasswordConfirm
	extends Pick<IRegisterFields, `password` | `confirm`> {}

export interface IUserInfoFields
	extends Omit<IRegisterFields, `confirm` | `code` | `status`> {}
