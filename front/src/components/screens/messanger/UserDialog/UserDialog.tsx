import Header from './Header/Header'
import HeaderOptions from './HeaderOptions/HeaderOptions'
import Message from './Message/Message'
import SendMessage from './SendMessage/SendMessage'
import { IMessage } from '@/types/messages.types'

import { useRef, useState } from 'react'

import { useAuth } from '@/hooks/useAuth'
import { useChat } from '@/hooks/useChat'

import styles from './UserDialog.module.scss'

const UserDialog = () => {
	const { user } = useAuth()
	const {
		chatInfo,
		messages,
		sendMessage,
		updateMessage,
		deleteMessage,
		getMessageById,
	} = useChat()
	const [activeMessage, setActiveMessage] = useState<number>(0)
	const [activeUpdate, setActiveUpdate] = useState<number>(0)
	const messagesBlockRef = useRef<HTMLDivElement>(null)

	const withUser = chatInfo
		? chatInfo.users.filter((u) => u.id !== user.id)
		: null

	const changeMessageClickStatus = (message: IMessage) => {
		if (user.id !== message.author.id || activeUpdate !== 0) {
			return
		}

		if (activeMessage === 0 || activeMessage !== message.id) {
			setActiveMessage(message.id)
		} else {
			setActiveMessage(0)
		}
	}


	if (!withUser || !withUser[0] || !messages) {
		return <></>
	}

	return (
		<div className={styles.dialogWrapper}>
			<div className={styles.dialogWindow}>
				{activeMessage === 0 ? (
					<Header withUser={withUser[0]} />
				) : (
					<HeaderOptions
						activeMessage={activeMessage}
						setActiveMessage={setActiveMessage}
						activeUpdate={activeUpdate}
						setActiveUpdate={setActiveUpdate}
						deleteMessage={deleteMessage}
					/>
				)}
				<div className={styles.messages} ref={messagesBlockRef}>
					{messages.map((mes) => {
						return (
							<Message
								onClick={() => changeMessageClickStatus(mes)}
								activeMessage={activeMessage}
								message={mes}
								key={mes.id}
							/>
						)
					})}
				</div>
				<SendMessage
					activeUpdate={activeUpdate}
					setActiveUpdate={setActiveUpdate}
					setActiveMessage={setActiveMessage}
					messagesBlock={messagesBlockRef}
					send={sendMessage}
					update={updateMessage}
					message={getMessageById(activeUpdate)}
				/>
			</div>
		</div>
	)
}

export default UserDialog
