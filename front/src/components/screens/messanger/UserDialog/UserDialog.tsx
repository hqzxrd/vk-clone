import { socket } from '@/api/interceptors'
import { IChatByUserId } from '@/types/messages.types'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

import AvatarMini from '@/components/ui/AvatarMini/AvatarMini'
import CamIcon from '@/components/ui/Icons/Post/CamIcon'
import SendIcon from '@/components/ui/Icons/Send'
import Textarea from '@/components/ui/Textarea/Textarea'

import { useAuth } from '@/hooks/useAuth'

import styles from './UserDialog.module.scss'

const UserDialog = () => {
	const [chatInfo, setChatInfo] = useState<IChatByUserId>()
	const [messages, setMessages] = useState([])
	const [text, setText] = useState<string>(``)
	const { user } = useAuth()
	const { query } = useRouter()
	const withUser = chatInfo
		? chatInfo.users.filter((u) => u.id !== user.id)
		: null

	useEffect(() => {
		socket.emit(
			'find chat by user id event',
			{ userId: +query.id! },
			(mes: IChatByUserId) => {
				console.log(mes)

				setChatInfo(mes)
			}
		)

		socket.emit(
			'get messages chat event',
			{ userId: +query.id! },
			(mes: any) => {
				setMessages(mes[0])
			}
		)
	}, [])

	const sendMessage = () => {
		socket.emit('private chat event', {
			toUserId: +query.id!,
			text: text,
		})
	}
	console.log(withUser)

	if (!withUser) {
		return null
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
				<div className={styles.messages}>
					{messages.map(() => {
						return <></>
					})}
				</div>
				<div className={styles.sendMessage}>
					<div className={styles.camIcon}>
						<CamIcon />
					</div>
					<Textarea
						style={{ maxHeight: 150, width: `100%` }}
						text={text}
						setText={setText}
						resize={true}
					/>
					<div className={styles.sendIcon}>
						<SendIcon onClick={() => sendMessage()} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default UserDialog
