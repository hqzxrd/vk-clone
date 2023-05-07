import { IEmailPassordFields } from './auth.interface'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'

import Button from '@/components/ui/form/Button'
import Input from '@/components/ui/form/Input'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'

import styles from './AuthForm.module.scss'

const validEmail =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const LoginForm: FC = () => {
	const { register, handleSubmit, formState, reset } =
		useForm<IEmailPassordFields>({
			mode: `onChange`,
		})
	const { push } = useRouter()
	const { user } = useAuth()
	const { login } = useActions()

	const onSubmit: SubmitHandler<IEmailPassordFields> = (data: any) => {
		login(data)

		if (user && !user.isAuth) {
			push(`/auth/code`)
		} else {
			push(`/`)
		}
	}

	return (
		<section className={styles.auth}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.heading}>Вход ВКонтакте</div>
				<Input
					placeholder="Почта"
					{...register(`email`, {
						required: `Введите почту`,
						pattern: {
							value: validEmail,
							message: `Неверная почта`,
						},
					})}
					error={formState.errors.email}
				/>
				<Input
					placeholder="Пароль"
					{...register(`password`, {
						required: `Введите пароль`,
						minLength: {
							value: 8,
							message: `Пароль должен быть более 8ми символвов`,
						},
					})}
					error={formState.errors.password}
				/>
				<Button>Войти</Button>
			</form>
		</section>
	)
}

export default LoginForm
