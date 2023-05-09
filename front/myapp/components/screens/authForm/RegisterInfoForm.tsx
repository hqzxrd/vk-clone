import BirthDateFields from './BirthDateFields/BirthDateFields'
import GenderSelector from './GenderSelector/GenderSelector'
import { IAuthFields, TypeGender, propsForInput } from './auth.interface'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

import Button from '@/components/ui/form/Button'
import Input from '@/components/ui/form/Input'

import { useAppDispatch } from '@/store/store'
import { register } from '@/store/user/user.action'
import { IUserDto } from '@/store/user/user.interface'

import styles from './AuthForm.module.scss'

const nameRegExp = /^[a-zA-Zа-яА-Я]+$/g

const UserInfoForm: FC<propsForInput> = ({ reg, handleSubmit, formState }) => {
	const [gender, setGender] = useState<TypeGender>(`male`)
	const dispatch = useAppDispatch()
	const { push } = useRouter()

	const onSubmit: SubmitHandler<IAuthFields> = async (data: IAuthFields) => {
		const modifiedDay = +data.day < 10 ? `0${data.day}` : data.day
		const modifiedMonth = +data.month < 10 ? `0${data.month}` : data.month

		const birthday = `${data.year}-${modifiedMonth}-${modifiedDay}`

		const userDto: IUserDto = {
			email: data.email,
			password: data.password,
			name: data.name,
			surname: data.surname,
			birthday,
			gender: gender,
		}
		console.log(gender, userDto)
		dispatch(register(userDto)).then((action) => {
			const status = action.meta.requestStatus
			if (status === `fulfilled`) push(`/profile`)
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
							value: nameRegExp,
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
							value: nameRegExp,
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
