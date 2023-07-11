import AvatarMini from '@/components/ui/AvatarMini/AvatarMini'

import { useAuth } from '@/hooks/useAuth'

import styles from './Chatitem.module.scss'

const ChatItem = () => {
	const { user } = useAuth()

	return (
		<div className={styles.chatItem}>
			<div>
				<AvatarMini user={user} width={50} height={50} isLink={false} />
			</div>
			<div className={styles.chatInfo}>
				<div className={styles.upperBlock}>
					<div className={styles.name}>
						{user.name} {user.surname}
					</div>
					<div className={styles.lastTime}>time</div>
				</div>
				<div className={styles.lastMessage}>
					<AvatarMini user={user} width={20} height={20} isLink={false} />
					<div>
						lastMessagelastMessagelastMessagelastMessagelastMessagelastMessagelastMessagelastMessage
					</div>
				</div>
			</div>
		</div>
	)
}

export default ChatItem
