import RegisterCodeForm from './RegisterCodeForm'
import EmailRegisterForm from './RegisterEmailForm'
import RegisterInfoForm from './RegisterInfoForm'
import PasswordRegisterForm from './RegisterPasswordForm'
import { IAuthFields } from './auth.interface'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const CreateUserWrapper = () => {
	const { asPath, push } = useRouter()
	const [state, setState] = useState<string>()

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
		push(`register#email`)
	}, [])

	const {
		register: reg,
		handleSubmit,
		formState,
		watch,
	} = useForm<IAuthFields>({
		mode: `onChange`,
	})

	if (state === `email`) {
		return (
			<EmailRegisterForm
				reg={reg}
				handleSubmit={handleSubmit}
				formState={formState}
				watch={watch}
			/>
		)
	}

	if (state === `code`) {
		return <RegisterCodeForm />
	}

	if (state === `password`) {
		return (
			<PasswordRegisterForm
				reg={reg}
				handleSubmit={handleSubmit}
				formState={formState}
				watch={watch}
			/>
		)
	}

	if (state === `info`) {
		return (
			<RegisterInfoForm
				reg={reg}
				handleSubmit={handleSubmit}
				formState={formState}
				watch={watch}
			/>
		)
	}
}

export default CreateUserWrapper
