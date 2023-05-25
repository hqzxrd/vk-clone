import Link from 'next/link'
import React, { FC } from 'react'

import { useActions } from '@/hooks/useActions'

import styles from './Header.module.scss'

const AuthHeader: FC = () => {
	const { logout, changeTheme } = useActions()

	return (
		<>
			<div className={styles.theme} onClick={() => changeTheme()}>
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
