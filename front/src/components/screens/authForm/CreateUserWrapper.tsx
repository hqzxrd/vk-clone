import RegisterCodeForm from './RegisterCodeForm'
import EmailRegisterForm from './RegisterEmailForm'
import RegisterInfoForm from './RegisterInfoForm'
import PasswordRegisterForm from './RegisterPasswordForm'
import { IRegisterFields } from './auth.interface'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const CreateUserWrapper = () => {
	const { asPath, replace } = useRouter()
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

	if (state === `email`) {
		return (
			<EmailRegisterForm
				reg={reg}
				handleSubmit={handleSubmit}
				formState={formState}
			/>
		)
	}

	if (state === `code`) {
		return (
			<RegisterCodeForm
				reg={reg}
				handleSubmit={handleSubmit}
				formState={formState}
			/>
		)
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
			/>
		)
	}

	return <div>Ошибка</div>
}

export default CreateUserWrapper
