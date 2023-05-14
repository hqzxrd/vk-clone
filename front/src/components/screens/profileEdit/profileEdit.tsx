import BirthDateFields from '../authForm/BirthDateFields/BirthDateFields'
import GenderSelector from '../authForm/GenderSelector/GenderSelector'
import { IUpdateProfileFieldsClient } from './profileEdit.interface'
import { TypeGender } from '@/types/auth.types'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'

import Button from '@/components/ui/form/Button'
import Input from '@/components/ui/form/Input'

import { useAuth } from '@/hooks/useAuth'
import { useProfile } from '@/hooks/useProfile'

import { NAME_REGEX } from '@/shared/regex'

import styles from './profileEdit.module.scss'

const ProfileEdit: FC = () => {
	const { user } = useAuth()
	const { isLoading, data } = useProfile(user.id)

	const [gender, setGender] = useState<TypeGender>(data?.gender || `male`)
	const {
		register: reg,
		handleSubmit,
		formState,
	} = useForm<IUpdateProfileFieldsClient>({
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
						value: data?.name,
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
						value: data?.surname,
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

				<Input
					placeholder="Статус"
					{...reg(`status`, {
						value: data?.status && data.status,
					})}
					maxLength={64}
					error={formState.errors.status}
				/>

				<Input
					placeholder="Город"
					{...reg(`city`, { value: data?.city && data.city })}
					maxLength={20}
					error={formState.errors.city}
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
