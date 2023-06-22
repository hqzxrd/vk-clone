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
				<div className={styles.logo}>
					<Link href="/">
						<Image src={`/vk_logo.ico`} alt="logo" height={24} width={24} />
						<div>ВКонтакте</div>
					</Link>
				</div>
				{isAuth ? (
					<AuthHeader />
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
