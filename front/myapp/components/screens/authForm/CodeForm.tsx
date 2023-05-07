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
	const { push } = useRouter()
	const { user } = useAuth()

	const onSubmit: SubmitHandler<code> = (data: code) => {
		user &&
			dispatch(code({ code: +data.code, email: user.email })).then((action) => {
				if (action.meta.requestStatus === `fulfilled`) {
					push(`/`)
				}
			})
	}

	return (
		<section className={styles.auth}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.heading}>
					Код был отправлен на <strong>{user?.email}</strong>
				</div>
				<div className={styles.heading}>Проверьте папку спам!</div>
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
				<Button>Ок</Button>
			</form>
		</section>
	)
}

export default CodeForm
