import BirthDateFields from '../authForm/BirthDateFields/BirthDateFields'
import GenderSelector from '../authForm/GenderSelector/GenderSelector'
import { TypeGender, UserFields } from '../authForm/auth.interface'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'

import Button from '@/components/ui/form/Button'
import Input from '@/components/ui/form/Input'

import styles from './profileEdit.module.scss'

const ProfileEdit: FC = () => {
	const [gender, setGender] = useState<TypeGender>(`male`)
	const {
		register: reg,
		handleSubmit,
		formState,
		watch,
	} = useForm<UserFields>({
		mode: `onChange`,
	})

	const onSubmit = () => {}

	return (
		<section className={styles.auth}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.heading}>Редактировать профиль</div>
				<div className={styles.info}>
					<Image src="/avatar.jpg" width={60} height={60} alt="avatar" />
					<GenderSelector gender={gender} setGender={setGender} />
				</div>
				<Input
					placeholder="Имя"
					{...reg(`name`, {
						required: `Введите имя`,
						minLength: {
							value: 8,
							message: `Пароль должен быть более 8ми символвов`,
						},
					})}
					error={formState.errors.password}
				/>

				<Input
					placeholder="Фамилия"
					{...reg(`surname`, {
						required: `Введите фамилию`,
						minLength: {
							value: 8,
							message: `Пароль должен быть более 8ми символвов`,
						},
					})}
					error={formState.errors.password}
				/>

				<Input
					placeholder="Статус"
					{...reg(`status`)}
					maxLength={64}
					error={formState.errors.password}
				/>

				<Input
					placeholder="Город"
					{...reg(`city`)}
					maxLength={20}
					error={formState.errors.password}
				/>

				<BirthDateFields formState={formState} reg={reg} />

				<div className={styles.link}>
					<Link href="edit/password">Сменить пароль</Link>
				</div>

				<Button>Сохранить</Button>
			</form>
		</section>
	)
}

export default ProfileEdit
