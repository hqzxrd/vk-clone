import AboutCount from '../AboutCount/AboutCount'
import UserActions from '../UserActions/UserActions'
import { IUser } from '@/types/user.types'


import { useDate } from '@/hooks/useDate'
import { usePosts } from '@/hooks/usePosts'
import { useProfile } from '@/hooks/useProfile'

import styles from './About.module.scss'
import { useParams } from 'react-router-dom'

const About = () => {
	const { userId } = useParams()
	const { isLoading, profile } = useProfile()
	const { posts } = usePosts(`?user=${userId}`)

	const { day, month, year } = useDate(profile ? profile.birthday : ``)

	const getGender = (data: IUser | undefined) => {
		if (!data) {
			return <></>
		}

		if (data.gender === `female`) {
			return `Женский`
		} else {
			return `Мужской`
		}
	}

	if (isLoading) {
		return <></>
	}

	return (
		<div className={styles.about}>
			<div className={styles.about_header}>
				<div className={styles.name}>
					{profile?.name} {profile?.surname}
				</div>
				<div className={styles.status}>{profile?.status}</div>
				<div className={styles.personalInfo}>Личная информация</div>
			</div>

			{/* <div className={styles.about_field}>
				<div>Город:</div>
				<div>{profile?.city}</div>
			</div>
			<div className={styles.about_field}>
				<div>Пол:</div>
				<div>{getGender(profile)}</div>
			</div>
			<div className={styles.about_field}>
				<div>Дата рождения:</div>
				<div>{`${day}.${month}.${year}`}</div>
			</div> */}

			<div className={styles.info}>
				<div className={styles.userActions}>
					<UserActions />
				</div>
				<div className={styles.userStats}>
					<AboutCount
						name="Друзей"
						value={profile ? profile?.countFriends : 0}
					/>
					<AboutCount
						name="Подписчиков"
						value={profile ? profile?.countIncomingRequests : 0}
					/>
					<AboutCount name="Постов" value={posts ? posts[1] : 0} />
				</div>
			</div>
		</div>
	)
}

export default About
