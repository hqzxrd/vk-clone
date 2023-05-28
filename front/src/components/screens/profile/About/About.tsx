import AboutCount from '../AboutCount/AboutCount'
import { IUser } from '@/types/user.types'
import { useRouter } from 'next/router'

import { useDate } from '@/hooks/useDate'
import { usePosts } from '@/hooks/usePosts'
import { useProfile } from '@/hooks/useProfile'

import styles from './About.module.scss'

const About = () => {
	const { query } = useRouter()
	const { profile } = useProfile()
	const { posts } = usePosts(`?user=${query.id}`)

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

	return (
		<div className={styles.about}>
			<div className={styles.about_header}>
				<div
					className={styles.name}
				>{`${profile?.name} ${profile?.surname}`}</div>
				<div className={styles.status}>{profile?.status}</div>
			</div>

			<div className={styles.about_field}>
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
			</div>

			<div className={styles.info}>
				<AboutCount name="Друзей" value={0} />
				<AboutCount name="Постов" value={posts ? posts[1] : 0} />
			</div>
		</div>
	)
}

export default About
