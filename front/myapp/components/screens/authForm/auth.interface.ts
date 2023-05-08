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
	changeState: React.Dispatch<React.SetStateAction<1 | 2>>
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

export interface IUserInfoFields {
	name: string
	surname: string
	day: string
	month: string
	year: string
	gender: string
}

export interface IAuthFields
	extends IEmailPassordFields,
		IUserInfoFields,
		IConfirmField {}
