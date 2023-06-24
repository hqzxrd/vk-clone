import { ICountNotifSSE, INotificationSSE } from './Notification.interface'
import Cookies from 'js-cookie'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toastr } from 'react-redux-toastr'

import { notificationUrl } from '@/config/api.config'

import { useAuth } from '@/hooks/useAuth'

import { setNotifCount } from '@/store/user/user.slice'

const SseNotif = () => {
	const { user } = useAuth()
	const dispatch = useDispatch()

	const hanleMessage = (e: MessageEvent<any>) => {
		const message: INotificationSSE = JSON.parse(e.data)

		dispatch(setNotifCount(message.count))

		if (message)
			if (message.type === 'friend_request') {
				toastr.info(
					`${message.fromUser.name} ${message.fromUser.surname}`,
					`Подал заявку в друзья`
				)
			}

		if (message.type === 'access_request') {
			toastr.info(
				`${message.fromUser.name} ${message.fromUser.surname}`,
				`Принял заявку в друзья`
			)
		}

		if (message.type === 'comment') {
			toastr.info(
				`${message.fromUser.name} ${message.fromUser.surname}`,
				`Прокомментировал вашу запись`
			)
		}

		if (message.type === 'like') {
			toastr.info(
				`${message.fromUser.name} ${message.fromUser.surname}`,
				`Что-то лайкнул`
			)
		}
	}

	useEffect(() => {
		let es: EventSource | undefined
		if (typeof window !== 'undefined') {
			es = new window.EventSource(
				notificationUrl(`/sse?token=${Cookies.get(`AccessToken`)}`),
				{
					withCredentials: true,
				}
			)
		}

		es && es.addEventListener('message', hanleMessage)

		return () => es && es.removeEventListener('message', hanleMessage)
	}, [])
	return <></>
}

export default SseNotif
