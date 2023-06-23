import { INotification } from './Notification.interface'
import React, { useEffect } from 'react'
import { toastr } from 'react-redux-toastr'

import { notificationUrl } from '@/config/api.config'

import { useAuth } from '@/hooks/useAuth'

const ToastrNotif = () => {
	const { user } = useAuth()

	const hanleMessage = (e: MessageEvent<any>) => {
		const message: INotification = JSON.parse(e.data)
		if (message.type === 'friend_request') {
			toastr.info(`${message.fromUser.id}`, `Подал заявку в друзья`)
		}

		if (message.type === 'access_request') {
			toastr.info(`${message.fromUser.id}`, `Принял заявку в друзья`)
		}

		if (message.type === 'comment') {
			toastr.info(`${message.fromUser.id}`, `Прокомментировал вашу запись`)
		}

		if (message.type === 'like') {
			toastr.info(`${message.fromUser.id}`, `Что-то лайкнул`)
		}
	}

	useEffect(() => {
		let es: EventSource | undefined
		if (typeof window !== 'undefined') {
			es = new window.EventSource(notificationUrl(`/sse?id=${user.id}`), {
				withCredentials: true,
			})
		}

		if (!es) {
			return <></>
		}
		es.addEventListener('message', hanleMessage)

		return () => es.removeEventListener('message', hanleMessage)
	}, [])
	return <></>
}

export default ToastrNotif
