import Header from './Header/Header'
import HeaderOptions from './HeaderOptions/HeaderOptions'
import Message from './Message/Message'
import SendMessage from './SendMessage/SendMessage'
import { IMessage } from '@/types/messages.types'
import cn from 'classnames'
import { useRef, useState } from 'react'

import AvatarMini from '@/components/ui/AvatarMini/AvatarMini'

import { useAuth } from '@/hooks/useAuth'
import { useChat } from '@/hooks/useChat'

import styles from './UserDialog.module.scss'

const UserDialog = () => {
	const { chatInfo, messages, sendMessage, updateMessage, deleteMessage } =
		useChat()
	const [activeMessage, setActiveMessage] = useState<number>(0)
	const { user } = useAuth()
	const messagesBlockRef = useRef<HTMLDivElement>(null)

	const withUser = chatInfo
		? chatInfo.users.filter((u) => u.id !== user.id)
		: null

	const changeMessageClickStatus = (message: IMessage) => {
		if (user.id !== message.author.id) {
			return
		}

		if (activeMessage === 0 || activeMessage !== message.id) {
			setActiveMessage(message.id)
		} else {
			setActiveMessage(0)
		}
	}

	if (!withUser || !messages) {
		return <></>
	}

	return (
		<div className={styles.dialogWrapper}>
			<div className={styles.dialogWindow}>
				{activeMessage === 0 ? (
					<Header withUser={withUser[0]} />
				) : (
					<HeaderOptions
						active={activeMessage}
						setActive={setActiveMessage}
						deleteMessage={deleteMessage}
					/>
				)}

				<div className={styles.messages} ref={messagesBlockRef}>
					{messages.map((mes) => {
						return (
							<div
								className={
									mes.id === activeMessage
										? cn(styles.messageWrapper, styles.active)
										: styles.messageWrapper
								}
								onClick={() => changeMessageClickStatus(mes)}
								key={mes.id}
							>
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
