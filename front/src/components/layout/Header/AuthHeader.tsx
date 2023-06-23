import cn from 'classnames'
import Link from 'next/link'
import React, { FC, useState } from 'react'

import DropDownWrap from '@/components/ui/DropDownWrap/DropDownWrap'
import NotificIcon from '@/components/ui/Icon/NotificIcon'
import ThemeIcon from '@/components/ui/Icon/ThemeIcon'

import { useActions } from '@/hooks/useActions'

import styles from './Header.module.scss'

const AuthHeader: FC = () => {
	const [notify, setNotify] = useState<boolean>(false)
	const { logout, changeTheme } = useActions()

	return (
		<>
			<div>
				<button
					className={
						notify
							? cn(styles.notification, styles.activeHeaderElem)
							: cn(styles.notification, styles.headerHover)
					}
					onClick={() => setNotify(!notify)}
				>
					<NotificIcon />
				</button>
				<DropDownWrap isOpen={notify} setIsOpen={setNotify}>
					<div>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</div>
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
