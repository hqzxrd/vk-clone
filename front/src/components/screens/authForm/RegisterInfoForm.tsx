import {
	IPropsHookForm,
	IRegisterFields,
	IUserInfoFields,
} from './auth.interface'
import { TypeGender } from '@/types/auth.types'
import { IRegisterFieldsDto } from '@/types/auth.types'
import { IUser } from '@/types/user.types'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

import BirthDateFields from '@/components/ui/BirthDateFields/BirthDateFields'
import Button from '@/components/ui/Form/Button'
import Input from '@/components/ui/Form/Input'
import GenderSelector from '@/components/ui/GenderSelector/GenderSelector'

import { NAME_REGEX } from '@/shared/regex'

import { useAppDispatch } from '@/store/store'
import { register } from '@/store/user/user.action'

import styles from './AuthForm.module.scss'

interface IProps extends Omit<IPropsHookForm<IRegisterFields>, `watch`> {}

const UserInfoForm: FC<IProps> = ({ reg, handleSubmit, formState }) => {
	const [gender, setGender] = useState<TypeGender>(`male`)
	const dispatch = useAppDispatch()
	const { replace } = useRouter()

	const onSubmit: SubmitHandler<IUserInfoFields> = async (
		data: IUserInfoFields
	) => {
		const modifiedDay = +data.day < 10 ? `0${data.day}` : data.day
		const modifiedMonth = +data.month < 10 ? `0${data.month}` : data.month

		const birthday = `${data.year}-${modifiedMonth}-${modifiedDay}`

		const userDto: IRegisterFieldsDto = {
			email: data.email,
			password: data.password,
			name: data.name,
			surname: data.surname,
			birthday,
			gender: gender,
		}
		dispatch(register(userDto)).then((action) => {
			const status = action.meta.requestStatus

			if (status === `fulfilled`) {
				const payload = action.payload as { user: IUser }
				const id = payload.user.id
				replace(`/users/${id}`)
			}
		})
	}

	return (
		<section className={styles.auth}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.heading}>Регистрация ВКонтакте</div>
				<div className={styles.descr}>Расскажите немного о себе</div>
				<Input
					placeholder="Имя"
					{...reg(`name`, {
						pattern: {
							value: NAME_REGEX,
							message: `Только ru или en буквы`,
						},
						required: `Введите имя`,
						maxLength: { value: 15, message: `Максимум 15 символов` },
						minLength: { value: 2, message: `Минимум 2 символа` },
					})}
					error={formState.errors.name}
				/>
				<Input
					placeholder="Фамилия"
					{...reg(`surname`, {
						pattern: {
							value: NAME_REGEX,
							message: `Только ru или en буквы`,
						},
						required: `Введите фамилию`,
						maxLength: { value: 15, message: `Максимум 15 символов` },
						minLength: { value: 2, message: `Минимум 2 символа` },
					})}
					error={formState.errors.surname}
				/>
				<BirthDateFields formState={formState} reg={reg} />
				<GenderSelector gender={gender} setGender={setGender} />
				<Button>Далее</Button>
			</form>
		</section>
	)
}

export default UserInfoForm
