import { socket } from '@/api/interceptors'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

import CamIcon from '@/components/ui/Icons/Post/CamIcon'
import SendIcon from '@/components/ui/Icons/Send'
import Textarea from '@/components/ui/Textarea/Textarea'

import styles from './UserDialog.module.scss'

const UserDialog = () => {
	const [text, setText] = useState<string>(``)
	const { query } = useRouter()

	useEffect(() => {
		socket.emit('get messages chat event', { id: +query.id! }, (mes: any) => {
			console.log(mes)
		})

		socket.on('receive message event', (mes: any) => {
			console.log(mes)
		})
	}, [])

	const sendMessage = () => {
		socket.emit('private chat event', {
			toUserId: +query.id!,
			text: text,
		})
	}

	return (
		<div className={styles.dialogWrapper}>
			<div className={styles.dialogWindow}>
				<div className={styles.header}>
					<div>Мессенджер</div>
					<div>Имя Фамилия {query.id}</div>
					<div>Аватар</div>
				</div>
				<div className={styles.messages}>messages</div>
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
