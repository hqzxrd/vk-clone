import RegisterCodeForm from './RegisterCodeForm'
import RegisterEmailForm from './RegisterEmailForm'
import RegisterInfoForm from './RegisterInfoForm'
import RegisterPasswordForm from './RegisterPasswordForm'
import { IRegisterFields } from './auth.interface'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
	FormState,
	UseFormHandleSubmit,
	UseFormRegister,
	UseFormWatch,
	useForm,
} from 'react-hook-form'

interface IPages {
	[page: string]: (
		reg: UseFormRegister<IRegisterFields>,
		handleSubmit: UseFormHandleSubmit<IRegisterFields>,
		formState: FormState<IRegisterFields>,
		watch: UseFormWatch<IRegisterFields>
	) => JSX.Element
}

const pages: IPages = {
	email: (reg, handleSubmit, formState) => (
		<RegisterEmailForm
			reg={reg}
			handleSubmit={handleSubmit}
			formState={formState}
		/>
	),

	code: (reg, handleSubmit, formState) => (
		<RegisterCodeForm
			reg={reg}
			handleSubmit={handleSubmit}
			formState={formState}
		/>
	),

	password: (reg, handleSubmit, formState, watch) => (
		<RegisterPasswordForm
			reg={reg}
			handleSubmit={handleSubmit}
			formState={formState}
			watch={watch}
		/>
	),

	info: (reg, handleSubmit, formState) => (
		<RegisterInfoForm
			reg={reg}
			handleSubmit={handleSubmit}
			formState={formState}
		/>
	),
}

const CreateUserWrapper = () => {
	const { asPath, replace } = useRouter()
	const [state, setState] = useState<string>(``)

	useEffect(() => {
		const hash = asPath.split(`#`)[1]
		if (
			hash === `email` ||
			hash === `code` ||
			hash === `password` ||
			hash === `info`
		)
			setState(hash)
	}, [asPath])

	useEffect(() => {
		replace(`register#email`)
	}, [])

	const {
		register: reg,
		handleSubmit,
		formState,
		watch,
	} = useForm<IRegisterFields>({
		mode: `onChange`,
	})

	if (!state) {
		return
	}

	return pages[state](reg, handleSubmit, formState, watch)
}

export default CreateUserWrapper
