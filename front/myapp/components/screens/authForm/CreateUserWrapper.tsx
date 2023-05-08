import RegisterForm from './RegisterForm'
import UserInfoForm from './UserInfoForm'
import { IAuthFields } from './auth.interface'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const CreateUserWrapper = () => {
	const [state, setState] = useState<1 | 2>(1)

	const {
		register: reg,
		handleSubmit,
		formState,
		watch,
	} = useForm<IAuthFields>({
		mode: `onChange`,
	})

	return (
		<>
			{state == 1 ? (
				<RegisterForm
					changeState={setState}
					reg={reg}
					handleSubmit={handleSubmit}
					formState={formState}
					watch={watch}
				/>
			) : (
				<UserInfoForm
					changeState={setState}
					reg={reg}
					handleSubmit={handleSubmit}
					formState={formState}
					watch={watch}
				/>
			)}
		</>
	)
}

export default CreateUserWrapper
