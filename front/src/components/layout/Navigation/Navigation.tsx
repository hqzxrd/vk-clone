import { FC } from 'react'

import NotificationBadge from '@/components/screens/friends/NotificationBadge'
import FriendsIcon from '@/components/ui/Icons/LeftSideMenu/FriendsIcon'
import MessangerIcon from '@/components/ui/Icons/LeftSideMenu/MessangerIcon'
import NewsIcon from '@/components/ui/Icons/LeftSideMenu/NewsIcon'
import PeoplesIcon from '@/components/ui/Icons/LeftSideMenu/PeoplesIcon'
import ProfileIcon from '@/components/ui/Icons/LeftSideMenu/ProfileIcon'

import { useAuth } from '@/hooks/useAuth'

import { userLink } from '@/utils/user-link'

import style from './Navigation.module.scss'
import { NavLink } from 'react-router-dom'

const Navigation: FC = () => {
	const { user } = useAuth()

	return (
		<div className={style.nav_wrapper}>
			<nav>
				<NavLink to={`/${userLink(user)}`}>
					<div>
						<div className={style.icon}>
							<ProfileIcon />
						</div>
						<div>Моя страница</div>
					</div>
				</NavLink>
				<NavLink to={`/newsline`}>
					<div>
						<div className={style.icon}>
							<NewsIcon />
						</div>
						<div>Лента</div>
					</div>
				</NavLink>
				<NavLink to="/messanger">
					<div>
						<div className={style.icon}>
							<MessangerIcon />
						</div>

						<div>Мессенджер</div>
					</div>
				</NavLink>
				<NavLink to="/friends">
					<div>
						<div className={style.icon}>
							<FriendsIcon />
						</div>

						<div>Друзья</div>

						<NotificationBadge />
					</div>
				</NavLink>
				<NavLink to="/peoples">
					<div>
						<div className={style.icon}>
							<PeoplesIcon />
						</div>

						<div>Люди</div>
					</div>
				</NavLink>
			</nav>
		</div>
	)
}

export default Navigation
