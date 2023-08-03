import { ILoginFields } from '@/types/auth.types'
import { IUser } from '@/types/user.types'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Button from '@/components/ui/Form/Button'
import Input from '@/components/ui/Form/Input'

import { useAuth } from '@/hooks/useAuth'

import { EMAIL_REGEX } from '@/shared/regex'

import { useAppDispatch } from '@/store/store'
import { login } from '@/store/user/user.action'

import { userLink } from '@/utils/user-link'

import styles from './AuthForm.module.scss'
import { Navigate, useNavigate } from 'react-router-dom'

const LoginForm: FC = () => {
	const { register, handleSubmit, formState } = useForm<ILoginFields>({
		mode: `onChange`,
	})
	const dispatch = useAppDispatch()
	const nav = useNavigate()
	const { isAuth } = useAuth()

	const onSubmit: SubmitHandler<ILoginFields> = async (data: any) => {
		dispatch(login(data)).then((action) => {
			const status = action.meta.requestStatus

			if (status === `fulfilled`) {
				const payload = action.payload as { user: IUser }
				nav(`/${userLink(payload.user)}`, { replace: true })

			}
		})
	}

	if (isAuth) return <Navigate to='/newsline' />

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
