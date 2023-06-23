import { INotificationDto } from './Notification.interface'
import Link from 'next/link'
import { FC } from 'react'

import AvatarMini from '@/components/ui/AvatarMini/AvatarMini'

import styles from './Notification.module.scss'

interface props {
	notif: INotificationDto
}

const notification: {
	[index: string]: (notif: INotificationDto) => JSX.Element
} = {
	friend_request: (notif: INotificationDto) => (
		<>
			<div className={styles.info}>
				<span>{`${notif.fromUser.name} ${notif.fromUser.surname} `}</span>
				подал заявку в друзья
			</div>
		</>
	),
	comment: (notif: INotificationDto) => (
		<>
			<div className={styles.info}>
				<span>{`${notif.fromUser.name} ${notif.fromUser.surname} `}</span>
				написал комментарий
			</div>
		</>
	),
	access_request: (notif: INotificationDto) => (
		<>
			<div className={styles.info}>
				<span>{`${notif.fromUser.name} ${notif.fromUser.surname} `}</span>
				принял заявку в друзья
			</div>
		</>
	),

	like: (notif: INotificationDto) => (
		<>
			<div className={styles.info}>
				<span>{`${notif.fromUser.name} ${notif.fromUser.surname} `}</span>
				что-то лайкнул
			</div>
		</>
	),
}

const Notification: FC<props> = ({ notif }) => {
	return (
		<Link className={styles.link} href={`/users/${notif.fromUser.id}`}>
			<AvatarMini user={notif.fromUser} width={30} height={30} isLink={false} />
			{notification[notif.type](notif)}
		</Link>
	)
}

export default Notification
