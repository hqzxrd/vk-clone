import { IUpdateFields, IUpdateFieldsDto } from './profileEdit.interface'
import { UserService } from '@/services/user/user.service'
import { TypeGender } from '@/types/auth.types'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'

import BirthDateFields from '@/components/ui/BirthDateFields/BirthDateFields'
import Button from '@/components/ui/Form/Button'
import Input from '@/components/ui/Form/Input'
import GenderSelector from '@/components/ui/GenderSelector/GenderSelector'

import { FilesUrl } from '@/config/api.config'

import { useAuth } from '@/hooks/useAuth'
import { useAvatarGenerate } from '@/hooks/useAvatarGenerate'
import usePhotos from '@/hooks/usePhoto'
import { useProfile } from '@/hooks/useProfile'

import { NAME_REGEX } from '@/shared/regex'

import styles from './profileEdit.module.scss'

const ProfileEdit: FC = () => {
	const inputFiles = useRef<HTMLInputElement>(null)
	const { push } = useRouter()
	const { user } = useAuth()
	const { profile } = useProfile(user.id)
	const [gender, setGender] = useState<TypeGender>(profile?.gender || `male`)
	const { file, avatar, errorSize, handleChange } = usePhotos()
	const color = useAvatarGenerate(profile ? profile.name : user.name)
	const {
		register: reg,
		handleSubmit,
		formState,
	} = useForm<IUpdateFields>({
		mode: `onChange`,
	})

	const onSubmit: SubmitHandler<IUpdateFields> = async (data) => {
		const modifiedDay = +data.day < 10 ? `0${+data.day}` : data.day
		const modifiedMonth = +data.month < 10 ? `0${+data.month}` : data.month

		const birthday = `${data.year}-${modifiedMonth}-${modifiedDay}`

		const userDto: IUpdateFieldsDto = {
			id: user.id,
			name: data.name,
			surname: data.surname,
			city: data.city,
			status: data.status,
			nickname: ``,
			birthday,
			gender,
		}

		const res = await UserService.updateProfile(userDto, file)

		res.status === 200 ? push(`/users/${user.id}`) : null
	}

	if (!profile) {
		return <></>
	}

	return (
		<section className={styles.auth}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.heading}>Редактировать профиль</div>
				<div className={styles.wrapper}>
					<div className={styles.hover_wrapper}>
						{!avatar && !profile.avatar ? (
							<div
								onClick={() => inputFiles.current?.click()}
								className={styles.avatar_placeholder}
								style={{ backgroundColor: color }}
							>
								{profile.name[0]}
							</div>
						) : (
							<Image
								onClick={() => inputFiles.current?.click()}
								src={
									avatar
										? avatar
										: profile?.avatar
										? `${FilesUrl(profile?.avatar)}`
										: ``
								}
								width={80}
								height={80}
								alt="avatar"
							/>
						)}
					</div>
					<span>Минимальный размер 300x300</span>
					<span>Ширина не может привышать высоту</span>
					<input
						onChange={(e) => handleChange(e)}
						style={{ display: 'none' }}
						type="file"
						accept=".jpg,.jpeg"
						ref={inputFiles}
					/>
					<GenderSelector gender={gender} setGender={setGender} />
				</div>
				<Input
					placeholder="Имя"
					{...reg(`name`, {
						value: profile.name,
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
						value: profile.surname,
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
						value: profile.status && profile.status,
					})}
					maxLength={64}
					error={formState.errors.status}
				/>

				<Input
					placeholder="Город"
					{...reg(`city`, { value: profile.city })}
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
