import Link from 'next/link'
import { FC, useState } from 'react'

import NotificationBadge from '@/components/screens/friends/NotificationBadge'
import FriendsIcon from '@/components/ui/Icons/LeftSideMenu/FriendsIcon'
import MessangerIcon from '@/components/ui/Icons/LeftSideMenu/MessangerIcon'
import NewsIcon from '@/components/ui/Icons/LeftSideMenu/NewsIcon'
import PeoplesIcon from '@/components/ui/Icons/LeftSideMenu/PeoplesIcon'
import ProfileIcon from '@/components/ui/Icons/LeftSideMenu/ProfileIcon'

import { useAuth } from '@/hooks/useAuth'

import { userLink } from '@/utils/user-link'

import style from './Navigation.module.scss'

const Navigation: FC = () => {
	const { user } = useAuth()
	console.log(user)

	return (
		<div className={style.nav_wrapper}>
			<nav>
				<Link href={`/users/${userLink(user)}`}>
					<div>
						<div className={style.icon}>
							<ProfileIcon />
						</div>
						<div>Моя страница</div>
					</div>
				</Link>
				<Link href={`/newsline`}>
					<div>
						<div className={style.icon}>
							<NewsIcon />
						</div>
						<div>Лента</div>
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
