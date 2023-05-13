import { IEmailPassordFields, propsForInput } from './auth.interface'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { SubmitHandler } from 'react-hook-form'

import Button from '@/components/ui/form/Button'
import Input from '@/components/ui/form/Input'

import styles from './AuthForm.module.scss'

const PasswordRegisterForm: FC<propsForInput> = ({
	reg,
	handleSubmit,
	formState,
	watch,
}) => {
	const { replace } = useRouter()

	const onSubmit: SubmitHandler<IEmailPassordFields> = (data) => {
		replace(`/auth/register#info`)
	}

	return (
		<section className={styles.auth}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.heading}>Регистрация ВКонтакте</div>
				<div className={styles.descr}>Придумайте надёжный пароль</div>
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
				<Button>Продолжить</Button>
			</form>
		</section>
	)
}

export default PasswordRegisterForm
