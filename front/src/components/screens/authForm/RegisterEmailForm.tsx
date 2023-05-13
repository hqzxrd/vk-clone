import { IEmailPassordFields, propsForInput } from './auth.interface'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import { SubmitHandler } from 'react-hook-form'

import Button from '@/components/ui/form/Button'
import Input from '@/components/ui/form/Input'

import { useAuth } from '@/hooks/useAuth'

import { EMAIL_REGEX } from '@/shared/regex'

import { useAppDispatch } from '@/store/store'
import { confirmation } from '@/store/user/user.action'

import styles from './AuthForm.module.scss'

const RegisterForm: FC<propsForInput> = ({ reg, handleSubmit, formState }) => {
	const dispatch = useAppDispatch()
	const { replace } = useRouter()
	const { isAutorized } = useAuth()

	useEffect(() => {
		isAutorized && replace(`/profile`)
	}, [])

	const onSubmit: SubmitHandler<IEmailPassordFields> = (data) => {
		dispatch(confirmation(data)).then((action) => {
			const status = action.meta.requestStatus
			if (status === `fulfilled`) replace(`/auth/register#code`)
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

export default RegisterForm
