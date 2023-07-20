import { IMessage } from '@/types/messages.types'
import cn from 'classnames'
import { FC } from 'react'

import { useAuth } from '@/hooks/useAuth'

import { date } from '@/utils/date'

import styles from './Message.module.scss'

interface props {
	message: IMessage
}

const Message: FC<props> = ({ message }) => {
	const { user } = useAuth()
	const { time } = date(message.createDate)

	const isUserSend = user.id === message.author.id

	return (
		<div
			className={
				isUserSend
					? cn(styles.message, styles.userSend)
					: cn(styles.message, styles.userGet)
			}
		>
			{message.text}
			<div className={styles.date}>{time}</div>
		</div>
	)
}

export default Message
