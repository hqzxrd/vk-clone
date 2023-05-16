import { IUpdateFields } from './profileEdit.interface'
import { TypeGender } from '@/types/auth.types'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import BirthDateFields from '@/components/ui/BirthDateFields/BirthDateFields'
import Button from '@/components/ui/Form/Button'
import Input from '@/components/ui/Form/Input'
import GenderSelector from '@/components/ui/GenderSelector/GenderSelector'

import { useAuth } from '@/hooks/useAuth'
import { useProfile } from '@/hooks/useProfile'

import { NAME_REGEX } from '@/shared/regex'

import styles from './profileEdit.module.scss'

const ProfileEdit: FC = () => {
	const ref = useRef<HTMLInputElement>(null)
	const { user } = useAuth()
	const { isLoading, data } = useProfile(user.id)
	const [gender, setGender] = useState<TypeGender>(data?.gender || `male`)

	const {
		register: reg,
		handleSubmit,
		formState,
	} = useForm<IUpdateFields>({
		mode: `onChange`,
	})

	const onSubmit: SubmitHandler<IUpdateFields> = (data) => {
		//patch profile
	}

	//upload avatar
	const onClickAvatar = () => {
		if (!ref) {
			return
		}
		ref.current?.click()
	}

	return (
		<section className={styles.auth}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.heading}>Редактировать профиль</div>
				<div className={styles.wrapper}>
					<Image
						onClick={() => onClickAvatar()}
						src="/avatar.jpg"
						width={80}
						height={80}
						alt="avatar"
					/>
					<input style={{ display: 'none' }} type="file" ref={ref} />
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
