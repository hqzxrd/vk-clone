import { IUpdateFields, IUpdateFieldsDto } from './profileEdit.interface'
import { UserService } from '@/services/user/user.service'
import { TypeGender } from '@/types/auth.types'
import { useRouter } from 'next/router'
import { FC, MouseEvent, useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import { toastr } from 'react-redux-toastr'

import AvatarMini from '@/components/ui/AvatarMini/AvatarMini'
import BirthDateFields from '@/components/ui/BirthDateFields/BirthDateFields'
import Button from '@/components/ui/Form/Button'
import Input from '@/components/ui/Form/Input'
import GenderSelector from '@/components/ui/GenderSelector/GenderSelector'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import usePhotos from '@/hooks/usePhoto'
import { useProfile } from '@/hooks/useProfile'

import { NAME_REGEX } from '@/shared/regex'

import { store } from '@/store/store'
import { deleteAvatar } from '@/store/user/user.action'

import styles from './profileEdit.module.scss'

const ProfileEdit: FC = () => {
	const [nickname, setNickname] = useState<string>()
	const inputFiles = useRef<HTMLInputElement>(null)
	const { push } = useRouter()
	const { user } = useAuth()
	const { profile } = useProfile(user.id)
	const [gender, setGender] = useState<TypeGender>(profile?.gender || `male`)
	const { file, avatar, setAvatar, handleChange } = usePhotos()
	const queryClient = useQueryClient()

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
			nickname: data.nickname,
			birthday,
			gender,
		}

		const res = await UserService.updateProfile(userDto, file)

		if (res) res.status === 200 ? push(`/users/${user.id}`) : null
	}

	const handleClickDeleteAvatar = async () => {
		setAvatar(``)
		const result = await store.dispatch(deleteAvatar())

		if (result.meta.requestStatus === 'fulfilled') {
			queryClient.invalidateQueries(`${user.id}`)
		}
	}

	const copy = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
		const text = e.currentTarget.textContent
		if (!text) {
			return
		}
		navigator.clipboard
			.writeText(text)
			.then(() => {
				toastr.info('Информация', 'Скопировано в буфер обмена')
			})
			.catch(() => {
				toastr.info('Информация', 'Ошибка копирования в буфер обмена')
			})
	}

	if (!profile) {
		return <></>
	}

	return (
		<section className={styles.auth}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.head}>Редактирование профиля</div>
				<div className={styles.line1}>
					<div className={styles.avatar}>
						<AvatarMini
							user={profile}
							width={140}
							height={140}
							isLink={false}
							image={avatar}
						/>
						<input
							onChange={(e) => handleChange(e)}
							style={{ display: 'none' }}
							type="file"
							accept=".jpg,.jpeg"
							ref={inputFiles}
						/>
					</div>
					<div className={styles.line1Actions}>
						<div className={styles.avatarActions}>
							<Button type="button" onClick={() => inputFiles.current?.click()}>
								Изменить
							</Button>
							<Button type="button" onClick={() => handleClickDeleteAvatar()}>
								Удалить
							</Button>
						</div>

						<GenderSelector gender={gender} setGender={setGender} />
					</div>
				</div>

				<div className={styles.line2}>
					<div>
						<label>Имя</label>
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
					</div>

					<div>
						<label>Фамилия</label>
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
					</div>
				</div>

				<div className={styles.line3}>
					<label>Статус</label>
					<div className={styles.line4Wrap}>
						<Input
							placeholder="Статус"
							{...reg(`status`, {
								value: profile.status && profile.status,
							})}
							maxLength={64}
							error={formState.errors.status}
						/>
					</div>
				</div>

				<div className={styles.line4}>
					<div>
						<label>Город</label>
						<Input
							placeholder="Город"
							{...reg(`city`, { value: profile.city })}
							maxLength={20}
							error={formState.errors.city}
						/>
						<label>Дата рождения</label>
						<BirthDateFields formState={formState} reg={reg} />
					</div>

					<div>
						<label>Никнейм</label>
						<Input
							placeholder="Никнейм"
							{...reg(`nickname`, { value: profile.nickname })}
							maxLength={20}
							onChange={(e) => setNickname(e.currentTarget.value)}
							error={formState.errors.nickname}
						/>
						<div className={styles.link} onClick={(e) => copy(e)}>
							{process.env.CLIENT_URL}/users/
							{nickname ? nickname : profile.nickname}
						</div>
					</div>
				</div>
				<div className={styles.line5}>
					<Button type="button">Сменить пароль</Button>
					<Button>Сохранить</Button>
				</div>
			</form>
		</section>
	)
}

export default ProfileEdit
