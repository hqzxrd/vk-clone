import { INotificationDto } from './Notification.interface'
import Link from 'next/link'
import { FC } from 'react'
import { text } from 'stream/consumers'

import AvatarMini from '@/components/ui/AvatarMini/AvatarMini'

import { date } from '@/utils/date'

import styles from './Notification.module.scss'

interface props {
	notif: INotificationDto
}

const notification: {
	[index: string]: (notif: INotificationDto) => JSX.Element
} = {
	friend_request: (notif: INotificationDto) => (
		<div className={styles.info}>
			<span>{`${notif.fromUser.name} ${notif.fromUser.surname} `}</span>
			подал заявку в друзья
		</div>
	),

	access_request: (notif: INotificationDto) => (
		<div className={styles.info}>
			<span>{`${notif.fromUser.name} ${notif.fromUser.surname} `}</span>
			принял заявку в друзья
		</div>
	),

	comment: (notif: INotificationDto) => {
		const { day, month, year, time } = date(notif.comment!.post.createDate)
		return (
			<div className={styles.info}>
				<span>{`${notif.fromUser.name} ${notif.fromUser.surname} `}</span>
				прокомментировал вашу запись от {day}.{month}.{year} в {time}
			</div>
		)
	},
	like_post: (notif: INotificationDto) => {
		const { day, month, year, time } = date(notif.post!.createDate)

		return (
			<div className={styles.info}>
				<span>{`${notif.fromUser.name} ${notif.fromUser.surname} `}</span>
				лайкнул вашу запись
				<span>{` ${
					notif.post?.text && notif.post.text.slice(0, 10)
				}... `}</span>
				от {day}.{month}.{year} в {time}
			</div>
		)
	},
	like_comment: (notif: INotificationDto) => {
		const { day, month, year, time } = date(notif.comment!.post.createDate)
		return (
			<div className={styles.info}>
				<span>{`${notif.fromUser.name} ${notif.fromUser.surname} `}</span>
				лайкнул ваш комментарий
				<span>{` ${notif.comment?.text.slice(0, 10)}... `}</span>от
				{` ${day}.${month}.${year} в ${time}`}
			</div>
		)
	},
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
