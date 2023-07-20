import Message from './Message/Message'
import Messages from './Messages/Messages'
import SendMessage from './SendMessage/SendMessage'
import { socket } from '@/api/interceptors'
import { IChatByUserId, IMessage } from '@/types/messages.types'
import { useRouter } from 'next/router'
import {
	KeyboardEvent,
	RefObject,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react'

import AvatarMini from '@/components/ui/AvatarMini/AvatarMini'
import CamIcon from '@/components/ui/Icons/Post/CamIcon'
import SendIcon from '@/components/ui/Icons/Send'
import Textarea from '@/components/ui/Textarea/Textarea'

import { useAuth } from '@/hooks/useAuth'
import { useChat } from '@/hooks/useChat'

import styles from './UserDialog.module.scss'

const UserDialog = () => {
	const { chatInfo, messages, sendMessage } = useChat()
	const { user } = useAuth()

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
				<Messages messages={messages} />
			</div>
			<SendMessage send={sendMessage} />
		</div>
	)
}

export default UserDialog
