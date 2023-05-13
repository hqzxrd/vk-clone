import Image from 'next/image'
import { useRouter } from 'next/router'

import styles from './Avatar.module.scss'

const Avatar = () => {
	const isAmI = true

	const { push } = useRouter()

	return (
		<div className={styles.avatar}>
			<Image src="/avatar.jpg" width={300} height={300} alt="avatar" />
			{isAmI ? (
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
