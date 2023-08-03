import {
	IPasswordConfirm,
	IPropsHookForm,
	IRegisterFields,
} from './auth.interface'
import { FC } from 'react'
import { SubmitHandler } from 'react-hook-form'

import Button from '@/components/ui/Form/Button'
import Input from '@/components/ui/Form/Input'

import styles from './AuthForm.module.scss'
import { useNavigate } from 'react-router-dom'

const RegisterPasswordForm: FC<IPropsHookForm<IRegisterFields>> = ({
	reg,
	handleSubmit,
	formState,
	watch,
}) => {
	const nav = useNavigate()
	// const { replace } = useRouter()

	const onSubmit: SubmitHandler<IPasswordConfirm> = () => {
		nav(`/register#info`, { replace: true })
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

export default RegisterPasswordForm
