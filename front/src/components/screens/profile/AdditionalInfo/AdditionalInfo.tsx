import { FC } from 'react'

import styles from './AdditionalInfo.module.scss'
import UserLinkIcon from '@/components/ui/Icons/Profile/UserLinkIcon'
import { IUser } from '@/types/user.types'
import { date } from '@/utils/date'
import BirthdayIcon from '@/components/ui/Icons/Profile/BirthdayIcon'
import GenderIcon from '@/components/ui/Icons/Profile/GenderIcon'
import CityIcon from '@/components/ui/Icons/Profile/CityIcon'

interface props {
	user: IUser
}

const AdditionalInfo: FC<props> = ({ user }) => {

	const {year, month, day} = date(user.birthday)

	const getGender = (data: IUser) => {
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
		<div className={styles.addtInfo}>
			<div className={styles.header}>Подробная информация</div>
			<div className={styles.main}>
				<div className={styles.nickname}><UserLinkIcon/> {user.nickname ? user.nickname : import.meta.env.VITE_CLIENT_URL + `/${user.id}`}</div>
				<div className={styles.city}><CityIcon/> {user.city ? user.city : `Не указан`}</div>
				<div className={styles.gender}><GenderIcon/> {getGender(user) }</div>
				<div className={styles.date}><BirthdayIcon/> {day}.{month}.{year}</div>
			</div>
		</div>
	)
}

export default AdditionalInfo
