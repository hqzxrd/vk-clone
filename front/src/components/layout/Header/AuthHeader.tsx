import { NotificationService } from '@/services/notification/notification.service'
import cn from 'classnames'
import Link from 'next/link'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import Notification from '@/components/screens/notification/Notification'
import { INotificationDto } from '@/components/screens/notification/Notification.interface'
import DropDownWrap from '@/components/ui/DropDownWrap/DropDownWrap'
import NotificIcon from '@/components/ui/Icon/NotificIcon'
import ThemeIcon from '@/components/ui/Icon/ThemeIcon'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'

import { setNotifCount } from '@/store/user/user.slice'

import styles from './Header.module.scss'

const AuthHeader: FC = () => {
	const { notificationCount } = useAuth()
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [notifications, setNotifications] = useState<INotificationDto[]>([])
	const { logout, changeTheme } = useActions()
	const dispatch = useDispatch()

	const handleClick = async () => {
		setIsOpen(!isOpen)
		if (!isOpen) {
			const res = await NotificationService.getAllNotifications()
			setNotifications(res.data[0])
			dispatch(setNotifCount(0))
		}
	}

	return (
		<>
			<div>
				<button
					className={
						isOpen
							? cn(styles.notification, styles.activeHeaderElem)
							: cn(styles.notification, styles.headerHover)
					}
					onClick={() => handleClick()}
				>
					{notificationCount ? (
						<div className={styles.notifCount}>{notificationCount}</div>
					) : (
						<></>
					)}

					<NotificIcon />
				</button>

				<DropDownWrap isOpen={isOpen} setIsOpen={setIsOpen}>
					{notifications.length ? (
						notifications.map((notif) => {
							return <Notification notif={notif} key={notif.id} />
						})
					) : (
						<>Уведомлений нет</>
					)}
				</DropDownWrap>
			</div>

			<button className={styles.theme} onClick={() => changeTheme()}>
				<ThemeIcon />
			</button>

			<Link
				className={styles.leave}
				href={`/auth/login`}
				onClick={() => logout()}
			>
				Выйти
			</Link>
		</>
	)
}

export default AuthHeader
