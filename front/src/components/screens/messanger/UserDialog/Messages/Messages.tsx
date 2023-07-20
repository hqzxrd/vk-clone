import Message from '../Message/Message'
import { IMessage } from '@/types/messages.types'
import { FC, RefObject, useEffect, useRef } from 'react'

import styles from './Messages.module.scss'

interface props {
	messages: IMessage[]
}

const Messages: FC<props> = ({ messages }) => {
	const messagesRef = useRef<HTMLDivElement>(null)
	const lastMessageRef = useRef<HTMLDivElement>(null)

	const scrollToBottom = () => {
		setTimeout(() => {
			if (messagesRef.current) {
				messagesRef.current.scrollTop = messagesRef.current.scrollHeight
			}
		}, 5)
	}

	useEffect(() => {
		console.log(messagesRef.current?.scrollHeight)

		scrollToBottom()
	}, [])

	useEffect(() => {
		if (!messagesRef.current || !lastMessageRef.current) {
			return
		}

		const scrollTop = messagesRef.current.scrollTop
		const messagesHeight = messagesRef.current.clientHeight
		const lastMessageHeight = lastMessageRef.current.clientHeight
		const gap = 20

		const isBottom =
			scrollTop + messagesHeight + lastMessageHeight + gap ===
			messagesRef.current.scrollHeight

		if (isBottom) {
			scrollToBottom()
		}
	}, [messages])

	return (
		<div className={styles.messages} ref={messagesRef}>
			{messages.map((mes, i) => {
				if (i === messages.length - 1) {
					return (
						<div ref={lastMessageRef} key={mes.id}>
							<Message message={mes} />
						</div>
					)
				}
				return (
					<div key={mes.id}>
						<Message message={mes} />
					</div>
				)
			})}
		</div>
	)
}

export default Messages
