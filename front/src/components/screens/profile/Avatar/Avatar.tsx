import Image from 'next/image'
import { useRouter } from 'next/router'

import { FilesUrl } from '@/config/api.config'

import { useAuth } from '@/hooks/useAuth'
import { useAvatarGenerate } from '@/hooks/useAvatarGenerate'
import { useProfile } from '@/hooks/useProfile'

import styles from './Avatar.module.scss'

const Avatar = () => {
	const { isLoading, data } = useProfile()
	const { user } = useAuth()
	const { push } = useRouter()
	const color = useAvatarGenerate(data?.name!)

	return (
		<div className={styles.avatar}>
			<div className={styles.avatar_img}>
				{data?.avatar ? (
					<Image
						priority={true}
						src={`${FilesUrl(data?.avatar)}`}
						width={300}
						height={300}
						quality={100}
						alt="avatar"
					/>
				) : (
					<div
						style={{ backgroundColor: color }}
						className={styles.avatar_placeholder}
					>
						{data?.name[0]}
					</div>
				)}
			</div>

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
