import AuthHeader from './AuthHeader'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'

import { useAuth } from '@/hooks/useAuth'

import styles from './Header.module.scss'

const Header: FC = () => {
	const { isAuth: auth } = useAuth()

	const [isAuth, setIsAuth] = useState<boolean>(true)

	useEffect(() => {
		if (!auth) {
			setIsAuth(false)
			return
		}
		setIsAuth(auth)
	}, [])

	return (
		<header className={styles.header}>
			<div className={styles.wrapper}>
				<Link className={styles.logo} href="/">
					<Image src={`/vk_logo.ico`} alt="logo" height={24} width={24} />
					<div>ВКонтакте</div>
				</Link>

				{isAuth ? (
					<AuthHeader />
				) : (
					<>
						<Link className={styles.signin} href="/auth/login">
							Войти
						</Link>
						<Link className={styles.register} href="/auth/register#email">
							Регистрация
						</Link>
					</>
				)}
			</div>
		</header>
	)
}

export default Header
