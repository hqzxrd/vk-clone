import { IUpdateProfileFieldsClient } from '../profileEdit/profileEdit.interface'
import { ILoginFields } from '@/types/auth.types'
import {
	FormState,
	UseFormHandleSubmit,
	UseFormRegister,
	UseFormWatch,
} from 'react-hook-form'

export interface propsRegInput {
	reg: UseFormRegister<IUpdateProfileFieldsClient>
}

export interface BirthDateComponentProps {
	reg: UseFormRegister<IUpdateProfileFieldsClient>
	formState: FormState<IUpdateProfileFieldsClient>
}

export interface RegisterPropsHookForm extends propsRegInput {
	handleSubmit: UseFormHandleSubmit<IUpdateProfileFieldsClient>
	formState: FormState<IUpdateProfileFieldsClient>
	watch: UseFormWatch<IUpdateProfileFieldsClient>
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
