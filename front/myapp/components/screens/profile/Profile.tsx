import Image from 'next/image'

import styles from './Profile.module.scss'

const Profile = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.profile}>
				<div className={styles.avatar}>
					<Image src="/avatar.jpg" width={300} height={300} alt="avatar" />
					<div>Добавить в друзья</div>
					<div>Написать сообщение</div>
				</div>
				<div className={styles.about}>
					<div className={styles.name}>Никита dev Соболев</div>
					<div className={styles.status}>Лютейший статус галактики</div>
					<div className={styles.city}>
						<span>Город:</span> где то там
					</div>
					<div className={styles.floorKappa}>
						<span>Пол:</span> какой то там
					</div>
					<div className={styles.info}>
						<div className={styles.friends}>
							<div>5</div>
							<div>Друзей</div>
						</div>
						<div className={styles.posts}>
							<div>5</div>
							<div>Постов</div>
						</div>
					</div>
				</div>
			</div>
			<div>POSTS</div>
		</div>
	)
}

export default Profile
