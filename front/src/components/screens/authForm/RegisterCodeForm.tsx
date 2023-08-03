import SegmentVerifInput from './SegmentVerifInput'
import { ICode, IPropsHookForm, IRegisterFields } from './auth.interface'
import { FC, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

import Button from '@/components/ui/Form/Button'
import Input from '@/components/ui/Form/Input'

import { useAuth } from '@/hooks/useAuth'

import { useAppDispatch } from '@/store/store'
import { code } from '@/store/user/user.action'

import styles from './AuthForm.module.scss'
import { useNavigate } from 'react-router-dom'

interface IProps extends Omit<IPropsHookForm<IRegisterFields>, `watch`> { }

const RegisterCodeForm: FC<IProps> = ({ reg, handleSubmit, formState }) => {
	const [verifCode, setVerifCode] = useState('')
	const dispatch = useAppDispatch()
	const nav = useNavigate()
	const { user } = useAuth()

	const onSubmit: SubmitHandler<ICode> = (data: ICode) => {
		dispatch(code({ code: +verifCode, email: user.email! })).then((action) => {
			const status = action.meta.requestStatus
			if (status === `fulfilled`) nav(`/register#password`, { replace: true })
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
				<SegmentVerifInput code={verifCode} setCode={setVerifCode} />
				<Button>Продолжить</Button>
			</form>
		</section>
	)
}

export default RegisterCodeForm
