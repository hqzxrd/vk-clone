import Image from 'next/image'
import Link from 'next/link'
import { FC, RefObject } from 'react'

import { setTheme } from '@/utils/setTheme'

import styles from './Header.module.scss'

interface props {
	refForSetTheme: RefObject<HTMLDivElement>
}

const Header: FC<props> = ({ refForSetTheme }) => {
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
				<div className={styles.theme} onClick={() => setTheme(refForSetTheme)}>
					Тема
				</div>
				<div>
					<Link href="/login">
						<div className={styles.sign}>Войти</div>
					</Link>
					<Link href="/register">
						<div className={styles.sign}>Регистрация</div>
					</Link>
				</div>
			</div>
		</header>
	)
}

export default Header
