import AuthHeader from './AuthHeader'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'

import { useAuth } from '@/hooks/useAuth'

import styles from './Header.module.scss'

export interface props {
	toggleTheme: () => void
}

const Header: FC<props> = ({ toggleTheme }) => {
	const { isAutorized } = useAuth()
	const [auth, setAuth] = useState(false)

	useEffect(() => {
		//для избежания hydration error
		if (isAutorized !== null) setAuth(isAutorized)
	}, [isAutorized])

	return (
		<header className={styles.header}>
			<div className={styles.wrapper}>
				<div className={styles.logo}>
					<Link href="/profile">
						<Image src={`/vk_logo.ico`} alt="logo" height={24} width={24} />
						<div>ВКонтакте</div>
					</Link>
				</div>
				{auth ? (
					<AuthHeader toggleTheme={toggleTheme} />
				) : (
					<div>
						<Link href="/auth/login">
							<div className={styles.sign}>Войти</div>
						</Link>
						<Link href="/auth/register#email">
							<div className={styles.sign}>Регистрация</div>
						</Link>
					</div>
				)}
			</div>
		</header>
	)
}

export default Header
