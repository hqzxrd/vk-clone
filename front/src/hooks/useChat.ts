import { AuthService } from '@/services/auth/auth.service'
import { IChatByUserId, IChatItem, IMessage } from '@/types/messages.types'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client'

import { WS_URL } from '@/config/api.config'

// let token = Cookies.get(`AccessToken`)
export const socket = io(WS_URL, {
	auth: { token: `` },
	autoConnect: false,
})

export const useChat = () => {
	const [chats, setChats] = useState<IChatItem[]>([])
	const [chatInfo, setChatInfo] = useState<IChatByUserId>()
	const [messages, setMessages] = useState<IMessage[]>([])
	const { query } = useRouter()

	const sendMessage = (text: string, Cb: () => void) => {
		socket.emit(
			'private chat event',
			{
				toUserId: +query.id!,
				text: text,
			},
			(message: IMessage) => {
				setMessages((messages) => [message, ...messages])

				Cb()
			}
		)
	}

	useEffect(() => {
		socket.connect()

		socket.on('connect', () => {
			console.log(`connected`)
		})

		socket.on('connect_error', async (err) => {
			if (err.message === `Unauthorized`) {
				const res = await AuthService.getNewsTokens()

				if (res.data.accessToken) socket.auth.token = res.data.accessToken
			}
			setTimeout(() => {
				socket.connect()
			}, 1000)
		})

		socket.on('disconnect', () => {
			console.log(`disconnected`)
		})

		socket.emit(
			'get all chat event',
			{ id: +query.id! },
			(mes: [IChatItem[], number]) => {
				setChats(mes[0])
			}
		)

		socket.emit(
			'find chat by user id event',
			{ userId: +query.id! },
			(res: IChatByUserId) => {
				setChatInfo(res)
			}
		)

		socket.emit(
			'get messages chat event',
			{ userId: +query.id! },
			(mes: [IMessage[], number]) => {
				setMessages(mes[0])
			}
		)

		socket.on('receive message event', (mes: IMessage) => {
			socket.emit(
				'get all chat event',
				{ id: +query.id! },
				(mes: [IChatItem[], number]) => {
					setChats(mes[0])
				}
			)
		})

		return () => {
			socket.off('connect')
			socket.off('connect_error')
			socket.off('disconnect')
			socket.off(`receive message event`)
			socket.disconnect()
		}
	}, [])

	useEffect(() => {
		socket.on('receive message event', (mes: IMessage) => {
			if (mes.chat.id === chatInfo?.id)
				setMessages((messages) => [mes, ...messages])
		})
	}, [chatInfo])

	return { chats, chatInfo, messages, sendMessage }
}
