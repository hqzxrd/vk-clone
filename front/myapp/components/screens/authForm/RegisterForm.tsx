import { IEmailPassordFields, propsForInput } from './auth.interface'
import { FC } from 'react'
import { SubmitHandler } from 'react-hook-form'

import Button from '@/components/ui/form/Button'
import Input from '@/components/ui/form/Input'

import styles from './AuthForm.module.scss'

const validEmail =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const RegisterForm: FC<propsForInput> = ({
	changeState,
	reg,
	handleSubmit,
	formState,
	watch,
}) => {
	const onSubmit: SubmitHandler<IEmailPassordFields> = () => {
		changeState(2)
	}

	return (
		<section className={styles.auth}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.heading}>Регистрация ВКонтакте</div>
				<Input
					placeholder="Почта"
					{...reg(`email`, {
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
					{...reg(`password`, {
						required: `Введите пароль`,
						minLength: {
							value: 8,
							message: `Пароль должен быть более 8ми символвов`,
						},
					})}
					error={formState.errors.password}
				/>

				<Input
					placeholder="Подтвердите пароль"
					{...reg(`confirm`, {
						required: `Введите пароль`,
						minLength: {
							value: 8,
							message: `Пароль должен быть более 8ми символвов`,
						},
						validate: (pass) => {
							if (watch(`password`) != pass) {
								return `Пароли не совпадают`
							}
						},
					})}
					error={formState.errors.confirm}
				/>
				<Button>Зарегистрироваться</Button>
			</form>
		</section>
	)
}

export default RegisterForm
