import { IChatItem } from '@/types/messages.types'
import { useRouter } from 'next/router'
import { FC } from 'react'

import AvatarMini from '@/components/ui/AvatarMini/AvatarMini'

import { useAuth } from '@/hooks/useAuth'

import { date } from '@/utils/date'

import styles from './Chatitem.module.scss'

interface props {
	chat: IChatItem
}

const ChatItem: FC<props> = ({ chat }) => {
	const { push } = useRouter()
	const { user } = useAuth()

	const { time, day, month, year } = date(chat.message.createDate)

	const [withUser] = chat.users.filter((u) => u.id !== user.id)

	return (
		<div
			className={styles.chatItem}
			onClick={() => push(`/users/${withUser.id}/dialog`)}
		>
			<div>
				<AvatarMini user={withUser} width={50} height={50} isLink={false} />
			</div>
			<div className={styles.chatInfo}>
				<div className={styles.upperBlock}>
					<div className={styles.name}>
						{withUser.name} {withUser.surname}
					</div>
					<div className={styles.lastTime}>
						{time} {day}.{month}.{year}
					</div>
				</div>
				<div className={styles.lastMessage}>
					<AvatarMini
						user={chat.message.author}
						width={20}
						height={20}
						isLink={false}
					/>
					<div>{chat.message.text}</div>
				</div>
			</div>
		</div>
	)
}

export default ChatItem
