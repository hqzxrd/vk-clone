import { IEmail, IPropsHookForm, IRegisterFields } from './auth.interface'
import { FC, useEffect } from 'react'
import { SubmitHandler } from 'react-hook-form'

import Button from '@/components/ui/Form/Button'
import Input from '@/components/ui/Form/Input'

import { useAuth } from '@/hooks/useAuth'

import { EMAIL_REGEX } from '@/shared/regex'

import { useAppDispatch } from '@/store/store'
import { confirmation } from '@/store/user/user.action'

import styles from './AuthForm.module.scss'
import { useNavigate } from 'react-router-dom'

interface IProps extends Omit<IPropsHookForm<IRegisterFields>, `watch`> { }

const RegisterEmailForm: FC<IProps> = ({ reg, handleSubmit, formState }) => {
	const dispatch = useAppDispatch()
	const nav = useNavigate()
	const { isAuth } = useAuth()

	// useEffect(() => {
	// 	isAuth && replace(`/profile`)
	// }, [])

	const onSubmit: SubmitHandler<IEmail> = (data) => {
		dispatch(confirmation(data)).then((action) => {
			const status = action.meta.requestStatus

			if (status === `fulfilled`) nav(`/register#code`, { replace: true })
		})
	}

	return (
		<section className={styles.auth}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.heading}>Регистрация ВКонтакте</div>
				<div className={styles.descr}>
					Ваша почта будет использоваться для входа в аккаунт
				</div>
				<Input
					placeholder="Почта"
					{...reg(`email`, {
						required: `Введите почту`,
						pattern: {
							value: EMAIL_REGEX,
							message: `Неверная почта`,
						},
					})}
					error={formState.errors.email}
				/>
				<Button>Продолжить</Button>
			</form>
		</section>
	)
}

export default RegisterEmailForm
