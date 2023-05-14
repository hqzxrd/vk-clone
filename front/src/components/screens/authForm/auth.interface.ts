import { ILoginFields } from '@/types/auth.types'
import {
	FormState,
	UseFormHandleSubmit,
	UseFormRegister,
	UseFormWatch,
} from 'react-hook-form'

export interface propsRegInput {
	reg: UseFormRegister<IRegisterFieldsClient>
}

export interface BirthDateComponentProps {
	reg: UseFormRegister<IRegisterFieldsClient>
	formState: FormState<IRegisterFieldsClient>
}

export interface RegisterPropsHookForm extends propsRegInput {
	handleSubmit: UseFormHandleSubmit<IRegisterFieldsClient>
	formState: FormState<IRegisterFieldsClient>
	watch: UseFormWatch<IRegisterFieldsClient>
}

export interface IConfirmPasswordField {
	confirm: string
}

export interface IRegisterInfoFields {
	name: string
	surname: string
	day: string
	month: string
	year: string
	gender: string
}

export interface IRegisterFieldsClient
	extends ILoginFields,
		IRegisterInfoFields,
		IConfirmPasswordField {}
