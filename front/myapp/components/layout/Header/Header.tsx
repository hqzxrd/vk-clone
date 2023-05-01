import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import styles from './Header.module.scss'

const Header: FC = () => {
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
