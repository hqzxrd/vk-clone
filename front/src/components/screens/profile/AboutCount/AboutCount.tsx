import { FC } from 'react'

import styles from './AboutCount.module.scss'

interface props {
	name: string
	value: number
}

const AboutCount: FC<props> = ({ name, value }) => {
	return (
		<div className={styles.user_info_counter}>
			<div>{value}</div>
			<div>{name}</div>
		</div>
	)
}

export default AboutCount
