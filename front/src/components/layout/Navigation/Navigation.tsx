import Link from 'next/link'
import { FC, useState } from 'react'

import NotificationBadge from '@/components/screens/friends/NotificationBadge'
import FriendsIcon from '@/components/ui/Icon/FriendsIcon'
import MessangerIcon from '@/components/ui/Icon/MessangerIcon'
import PeoplesIcon from '@/components/ui/Icon/PeoplesIcon'
import ProfileIcon from '@/components/ui/Icon/ProfileIcon'

import { useAuth } from '@/hooks/useAuth'

import style from './Navigation.module.scss'

const Navigation: FC = () => {
	const { user } = useAuth()

	return (
		<div className={style.nav_wrapper}>
			<nav>
				<Link href={`/users/${user.id}`}>
					<div>
						<div className={style.icon}>
							<ProfileIcon />
						</div>
						<div>Моя страница</div>
					</div>
				</Link>
				<Link href="/messanger">
					<div>
						<div className={style.icon}>
							<MessangerIcon />
						</div>

						<div>Мессенджер</div>
					</div>
				</Link>
				<Link href="/friends">
					<div>
						<div className={style.icon}>
							<FriendsIcon />
						</div>

						<div>Друзья</div>

						<NotificationBadge />
					</div>
				</Link>
				<Link href="/peoples">
					<div>
						<div className={style.icon}>
							<PeoplesIcon />
						</div>

						<div>Люди</div>
					</div>
				</Link>
			</nav>
		</div>
	)
}

export default Navigation
