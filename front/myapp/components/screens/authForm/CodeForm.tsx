import { IEmailPassordFields } from './auth.interface'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'

import Button from '@/components/ui/form/Button'
import Input from '@/components/ui/form/Input'

import { useActions } from '@/hooks/useActions'

import styles from './AuthForm.module.scss'

interface code {
	code: string
}

const CodeForm: FC = () => {
	const { register, handleSubmit, formState, reset } = useForm<code>({
		mode: `onChange`,
	})

	// const { code } = useActions()

	const onSubmit: SubmitHandler<code> = (data: any) => {}

	return (
		<section className={styles.auth}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.heading}>Код был отправлен на почту</div>
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
