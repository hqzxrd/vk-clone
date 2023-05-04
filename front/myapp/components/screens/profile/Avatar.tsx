import Image from 'next/image'

import styles from './Avatar.module.scss'

const Avatar = () => {
	return (
		<div className={styles.avatar}>
			<Image src="/avatar.jpg" width={300} height={300} alt="avatar" />
			<div>Добавить в друзья</div>
			<div>Написать сообщение</div>
		</div>
	)
}

export default Avatar
