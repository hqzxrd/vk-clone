import { IUpdateFields, IUpdateFieldsDto } from './profileEdit.interface'
import { UserService } from '@/services/user/user.service'
import { TypeGender } from '@/types/auth.types'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import BirthDateFields from '@/components/ui/BirthDateFields/BirthDateFields'
import Button from '@/components/ui/Form/Button'
import Input from '@/components/ui/Form/Input'
import GenderSelector from '@/components/ui/GenderSelector/GenderSelector'

import { FilesUrl } from '@/config/api.config'

import { useAuth } from '@/hooks/useAuth'
import usePrepareAvatar from '@/hooks/usePrepareAvatar'
import { useProfile } from '@/hooks/useProfile'

import { NAME_REGEX } from '@/shared/regex'

import styles from './profileEdit.module.scss'

const ProfileEdit: FC = () => {
	const ref = useRef<HTMLInputElement>(null)
	const { push } = useRouter()
	const { user } = useAuth()
	const { isLoading, data } = useProfile(user.id)
	const [gender, setGender] = useState<TypeGender>(data?.gender || `male`)
	const { file, avatar, handleChange } = usePrepareAvatar()

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

	return (
		<section className={styles.auth}>
			{isLoading ? (
				<></>
			) : (
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.heading}>Редактировать профиль</div>
					<div className={styles.wrapper}>
						<div className={styles.hover_wrapper}>
							<Image
								priority={true}
								onClick={() => ref.current?.click()}
								src={
									avatar
										? avatar
										: data?.avatar
										? `${FilesUrl(data?.avatar)}`
										: ``
								}
								width={80}
								height={80}
								alt="avatar"
							/>
						</div>

						<input
							onChange={(e) => handleChange(e)}
							style={{ display: 'none' }}
							type="file"
							ref={ref}
						/>
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
			)}
		</section>
	)
}

export default ProfileEdit
