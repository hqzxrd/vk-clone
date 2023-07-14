import ChatItem from './ChatItem/ChatItem'
import { socket } from '@/api/interceptors'
import { IChatItem } from '@/types/messages.types'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import CrossIcon from '@/components/ui/Icons/CrossIcon'
import SearchIcon from '@/components/ui/Icons/Messanger/SearchIcon'

import styles from './Messanger.module.scss'

const Messanger = () => {
	const [chats, setChats] = useState<IChatItem[]>([])
	const { query } = useRouter()
	console.log(chats)

	useEffect(() => {
		socket.emit(
			'get all chat event',
			{ id: +query.id! },
			(mes: [IChatItem[], number]) => {
				console.log(mes)
				setChats(mes[0])
			}
		)
	}, [])

	return (
		<div className={styles.messangerWrapper}>
			<div className={styles.messanger}>
				<div className={styles.header}>
					<SearchIcon />
					<input type="text" placeholder="Поиск" />
					<CrossIcon />
				</div>
				<div className={styles.allChats}>
					{chats.map((chat) => {
						return <ChatItem chat={chat} key={chat.id} />
					})}
				</div>
			</div>
		</div>
	)
}

export default Messanger
