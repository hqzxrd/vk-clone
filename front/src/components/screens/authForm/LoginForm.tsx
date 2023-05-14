import { ILoginFields } from '@/types/auth.types'
import { IUser } from '@/types/user.types'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Button from '@/components/ui/form/Button'
import Input from '@/components/ui/form/Input'

import { useAuth } from '@/hooks/useAuth'

import { EMAIL_REGEX } from '@/shared/regex'

import { useAppDispatch } from '@/store/store'
import { login } from '@/store/user/user.action'

import styles from './AuthForm.module.scss'

const LoginForm: FC = () => {
	const { register, handleSubmit, formState } = useForm<ILoginFields>({
		mode: `onChange`,
	})
	const dispatch = useAppDispatch()
	const { replace, isReady } = useRouter()
	const { isAutorized } = useAuth()

	useEffect(() => {
		isAutorized && replace(`/users/profile`)
	}, [])

	const onSubmit: SubmitHandler<ILoginFields> = async (data: any) => {
		dispatch(login(data)).then((action) => {
			const status = action.meta.requestStatus
			const payload = action.payload as { user: IUser }
			const id = payload.user.id
			if (status === `fulfilled`) replace(`/users/${id}`)
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
							value: EMAIL_REGEX,
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
