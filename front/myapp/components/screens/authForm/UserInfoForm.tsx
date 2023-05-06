import BirthDateFields from './BirthDateFields/BirthDateFields'
import GenderSelector from './GenderSelector/GenderSelector'
import { IAuthFields, propsForInput } from './auth.interface'
import { FC } from 'react'
import { SubmitHandler } from 'react-hook-form'

import Button from '@/components/ui/form/Button'
import Input from '@/components/ui/form/Input'

import { IUserDto } from '@/store/user/user.interface'

import styles from './AuthForm.module.scss'

const nameRegExp = /^[a-zA-Zа-яА-Я]+$/g

const UserInfoForm: FC<propsForInput> = ({ reg, handleSubmit, formState }) => {
	const onSubmit: SubmitHandler<IAuthFields> = (data: IAuthFields) => {
		const birthday = `${data.year}-${data.month}-${data.day}`

		const user: IUserDto = {
			email: data.email,
			password: data.password,
			name: data.name,
			surname: data.surname,
			birthday,
			gender: data.gender,
		}
		//tyt register
		console.log(data)
	}

	return (
		<section className={styles.auth}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.heading}>Расскажите немного о себе</div>
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
				<GenderSelector reg={reg} />
				<Button>Далее</Button>
			</form>
		</section>
	)
}

export default UserInfoForm
