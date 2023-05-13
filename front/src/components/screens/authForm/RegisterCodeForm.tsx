import { useRouter } from 'next/router'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Button from '@/components/ui/form/Button'
import Input from '@/components/ui/form/Input'

import { useAuth } from '@/hooks/useAuth'

import { useAppDispatch } from '@/store/store'
import { code } from '@/store/user/user.action'

import styles from './AuthForm.module.scss'

interface code {
	code: string
}

const CodeForm: FC = () => {
	const { register, handleSubmit, formState, reset } = useForm<code>({
		mode: `onChange`,
	})
	const dispatch = useAppDispatch()
	const { replace } = useRouter()
	const { user } = useAuth()

	const onSubmit: SubmitHandler<code> = (data: code) => {
		dispatch(code({ code: +data.code, email: user.email })).then((action) => {
			const status = action.meta.requestStatus
			if (status === `fulfilled`) replace(`/auth/register#password`)
		})
	}

	return (
		<section className={styles.auth}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.heading}>Подтверждение почты</div>
				<div className={styles.descr}>
					Код был отправлен на <strong>{user.email}</strong>
				</div>
				<div className={styles.descr}>Проверьте папку спам!</div>
				<Input
					placeholder="Код"
					{...register(`code`, {
						required: `Введите код`,
						minLength: {
							value: 6,
							message: `Неверный код`,
						},
					})}
					maxLength={6}
					error={formState.errors.code}
				/>
				<Button>Продолжить</Button>
			</form>
		</section>
	)
}

export default CodeForm
