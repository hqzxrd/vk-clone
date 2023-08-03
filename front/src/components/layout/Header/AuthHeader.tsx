import { NotificationService } from '@/services/notification/notification.service'
import cn from 'classnames'
import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux'

import Notification from '@/components/screens/notification/Notification'
import { INotificationDto } from '@/components/screens/notification/Notification.interface'
import AvatarMini from '@/components/ui/AvatarMini/AvatarMini'
import DropDownWrap from '@/components/ui/DropDownWrap/DropDownWrap'
import ArrowDownIcon from '@/components/ui/Icons/Header/ArrowDownIcon'
import LeaveIcon from '@/components/ui/Icons/Header/LeaveIcon'
import NotificIcon from '@/components/ui/Icons/Header/NotificIcon'
import ThemeIcon from '@/components/ui/Icons/Header/ThemeIcon'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import { useTypedSelector } from '@/hooks/useTypedSelector'

import { setNotifCount } from '@/store/user/user.slice'

import styles from './Header.module.scss'
import { NavLink } from 'react-router-dom'

const AuthHeader: FC = () => {
	const { user, isAuth } = useAuth()
	const { theme } = useTypedSelector((st) => st.theme)
	const { notifications: notif } = useTypedSelector((st) => st.user)
	const [isOpenNotification, setIsOpenNotification] = useState<boolean>(false)
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [notifications, setNotifications] = useState<INotificationDto[]>([])
	const { logout, changeTheme } = useActions()
	const dispatch = useDispatch()

	const handleClick = async () => {
		setIsOpenNotification(!isOpenNotification)
		if (!isOpenNotification) {
			const res = await NotificationService.getAllNotifications()
			if (res) setNotifications(res.data[0])
			dispatch(
				setNotifCount({ notificationCount: 0, notificationIncomingCount: 0 })
			)
		}
	}

	if (!isAuth) {
		return <></>
	}

	return (
		<>
			<div>
				<button
					className={
						isOpenNotification
							? cn(styles.notification, styles.activeHeaderElem)
							: cn(styles.notification, styles.headerHover)
					}
					onClick={() => handleClick()}
				>
					{notif.notificationCount !== 0 && (
						<div className={styles.notifCount}>{notif.notificationCount}</div>
					)}

					<NotificIcon />
				</button>

				<DropDownWrap
					isOpen={isOpenNotification}
					setIsOpen={setIsOpenNotification}
				>
					{notifications.length ? (
						notifications.map((notif) => {
							return <Notification notif={notif} key={notif.id} />
						})
					) : (
						<>Уведомлений нет</>
					)}
				</DropDownWrap>
			</div>

			<div className={styles.lastMenu}>
				<button
					className={
						isOpen
							? cn(styles.notification, styles.activeHeaderElem)
							: cn(styles.notification, styles.headerHover)
					}
					onClick={() => setIsOpen(!isOpen)}
				>
					<AvatarMini user={user} width={22} height={22} isLink={false} />
					<ArrowDownIcon />
				</button>

				<DropDownWrap
					className={styles.lastMenuDropDown}
					isOpen={isOpen}
					setIsOpen={setIsOpen}
				>
					<button onClick={() => changeTheme()}>
						<ThemeIcon /> Тема:{' '}
						<span>{theme === `dark` ? 'Тёмная' : 'Светлая'}</span>
					</button>
					<NavLink
						className={styles.leave}
						to={`/login`}
						onClick={() => logout()}
					>
						<div>
							<LeaveIcon />
						</div>
						<div>Выйти</div>
					</NavLink>
				</DropDownWrap>
			</div>
		</>
	)
}

export default AuthHeader
