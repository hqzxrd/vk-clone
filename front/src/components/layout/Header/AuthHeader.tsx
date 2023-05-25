import { props } from './Header'
import Link from 'next/link'
import React, { FC } from 'react'

import { useActions } from '@/hooks/useActions'

import styles from './Header.module.scss'

const AuthHeader: FC<props> = ({ toggleTheme }) => {
	const { logout } = useActions()
	return (
		<>
			<div
				className={styles.theme}
				onClick={() => {
					toggleTheme()
				}}
			>
				Тема
			</div>
			<div>
				<Link href={`/auth/login`} onClick={() => logout()}>
					<span className={styles.sign}>Выйти</span>
				</Link>
			</div>
		</>
	)
}

export default AuthHeader
