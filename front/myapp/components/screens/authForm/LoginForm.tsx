import { IEmailPassordFields } from './auth.interface'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Button from '@/components/ui/form/Button'
import Input from '@/components/ui/form/Input'

import { useAppDispatch } from '@/store/store'
import { login } from '@/store/user/user.action'
import { IAuthResponse } from '@/store/user/user.interface'

import styles from './AuthForm.module.scss'

const validEmail =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const LoginForm: FC = () => {
	const { register, handleSubmit, formState, reset } =
		useForm<IEmailPassordFields>({
			mode: `onChange`,
		})
	const dispatch = useAppDispatch()
	const { push } = useRouter()

	const onSubmit: SubmitHandler<IEmailPassordFields> = async (data: any) => {
		dispatch(login(data)).then((action) => {
			if (action.meta.requestStatus === `fulfilled`) {
				const payload = action.payload as IAuthResponse
				if (!payload.user.isAuth) {
					push(`code`)
				} else {
					push(`/`)
				}
			}
		})
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
