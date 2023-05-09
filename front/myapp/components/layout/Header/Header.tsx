import Image from 'next/image'
import Link from 'next/link'
import { FC, RefObject } from 'react'

import { useDarkTheme } from '@/hooks/useDarkTheme'

import styles from './Header.module.scss'

interface props {
	toggleTheme: () => void
}

const Header: FC<props> = ({ toggleTheme }) => {
	return (
		<header className={styles.header}>
			<div className={styles.wrapper}>
				<div className={styles.logo}>
					<Link href="/profile">
						<Image src={`/vk_logo.ico`} alt="logo" height={24} width={24} />
						<div>ВКонтакте</div>
					</Link>
				</div>
				<div className={styles.search}>
					<input type="text" placeholder="Поиск" />
				</div>
				<div className={styles.theme} onClick={() => toggleTheme()}>
					Тема
				</div>
				<div>
					<Link href="/auth/login">
						<div className={styles.sign}>Войти</div>
					</Link>
					<Link href="/auth/register#email">
						<div className={styles.sign}>Регистрация</div>
					</Link>
				</div>
			</div>
		</header>
	)
}

export default Header
