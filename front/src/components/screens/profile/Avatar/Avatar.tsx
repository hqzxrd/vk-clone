import Image from 'next/image'
import { useRouter } from 'next/router'

import { FilesUrl } from '@/config/api.config'

import { useAuth } from '@/hooks/useAuth'
import { useProfile } from '@/hooks/useProfile'

import styles from './Avatar.module.scss'

const Avatar = () => {
	const { isLoading, data } = useProfile()
	const { user } = useAuth()
	const { push } = useRouter()

	return (
		<div className={styles.avatar}>
			<Image
				priority={true}
				src={data?.avatar ? `${FilesUrl(data?.avatar)}` : `/avatar.jpg`}
				width={300}
				height={300}
				alt="avatar"
			/>
			{user.id === data?.id ? (
				<div onClick={() => push(`/users/profile/edit`)}>
					Редактировать профиль
				</div>
			) : (
				<>
					<div>Добавить в друзья</div>
					<div>Написать сообщение</div>
				</>
			)}
		</div>
	)
}

export default Avatar
