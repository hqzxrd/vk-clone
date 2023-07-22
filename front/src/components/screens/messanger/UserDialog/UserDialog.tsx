import Message from './Message/Message'
import SendMessage from './SendMessage/SendMessage'
import { useRef } from 'react'

import AvatarMini from '@/components/ui/AvatarMini/AvatarMini'

import { useAuth } from '@/hooks/useAuth'
import { useChat } from '@/hooks/useChat'

import styles from './UserDialog.module.scss'

const UserDialog = () => {
	const { chatInfo, messages, sendMessage } = useChat()
	const { user } = useAuth()
	const messagesBlockRef = useRef<HTMLDivElement>(null)

	const withUser = chatInfo
		? chatInfo.users.filter((u) => u.id !== user.id)
		: null

	if (!withUser || !messages) {
		return <></>
	}

	return (
		<div className={styles.dialogWrapper}>
			<div className={styles.dialogWindow}>
				<div className={styles.header}>
					<div>Мессенджер</div>
					<div>
						{withUser[0].name} {withUser[0].surname}
					</div>
					<div>
						<AvatarMini
							user={withUser[0]}
							width={25}
							height={25}
							isLink={false}
						/>
					</div>
				</div>
				<div className={styles.messages} ref={messagesBlockRef}>
					{messages.map((mes) => {
						return (
							<div key={mes.id}>
								<Message message={mes} />
							</div>
						)
					})}
				</div>
				<SendMessage messagesBlock={messagesBlockRef} send={sendMessage} />
			</div>
		</div>
	)
}

export default UserDialog
