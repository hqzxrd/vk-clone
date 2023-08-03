import AuthHeader from './AuthHeader'

import { FC } from 'react'

import { useAuth } from '@/hooks/useAuth'

import styles from './Header.module.scss'
import { NavLink } from 'react-router-dom'

const Header: FC = () => {
	const { isAuth } = useAuth()


	return (
		<header className={styles.header}>
			<div className={styles.wrapper}>
				<NavLink className={styles.logo} to={isAuth ? `/` : `/login`}>
					<img src={`/vite.svg`} alt="logo" height={24} width={24} />
					<div>ВКонтакте</div>
				</NavLink>

				{isAuth ? (
					<AuthHeader />
				) : (
					<>
						<NavLink className={styles.signin} to="/login">
							Войти
						</NavLink>
						<NavLink className={styles.register} to="/register#email">
							Регистрация
						</NavLink>
					</>
				)}
			</div>
		</header>
	)
}

export default Header
