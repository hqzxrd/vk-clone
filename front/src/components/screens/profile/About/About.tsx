import AboutCount from '../AboutCount/AboutCount'
import { IUser } from '@/types/user.types'

import { useNormalDate } from '@/hooks/useNormalDate'
import { useProfile } from '@/hooks/useProfile'

import styles from './About.module.scss'

const About = () => {
	const { isLoading, data } = useProfile()

	const { day, month, year } = useNormalDate(data ? data.birthday : ``)

	const getGender = (data: IUser | undefined) => {
		if (!data) {
			return `Ошибка`
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
				<div className={styles.name}>{`${data?.name} ${data?.surname}`}</div>
				<div className={styles.status}>{data?.status}</div>
			</div>

			<div className={styles.about_field}>
				<div>Город:</div>
				<div>{data?.city}</div>
			</div>
			<div className={styles.about_field}>
				<div>Пол:</div>
				<div>{getGender(data)}</div>
			</div>
			<div className={styles.about_field}>
				<div>Дата рождения:</div>
				<div>{`${day}.${month}.${year}`}</div>
			</div>

			<div className={styles.info}>
				<AboutCount name="Друзей" value={1} />
				<AboutCount name="Постов" value={3} />
			</div>
		</div>
	)
}

export default About
