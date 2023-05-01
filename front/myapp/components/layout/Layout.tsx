import Header from './Header/Header'
import Navigation from './Navigation/Navigation'
import Sidebar from './Sidebar/Sidebar'
import { useRouter } from 'next/router'
import { FC } from 'react'

import IChildren from '@/utils/children.inteface'

import styles from './Layout.module.scss'

function isHideSidebar() {
	const router = useRouter()
	return router.pathname === '/register' || router.pathname === '/login' ? (
		``
	) : (
		<Navigation />
	)
}

const Layout: FC<IChildren> = ({ children }) => {
	return (
		<div className={styles.layout}>
			<div className={styles.header_wrapper}>
				<Header />
			</div>
			<div className={styles.main_wrapper}>
				<div className={styles.main}>
					{isHideSidebar()}
					<div className={styles.center}>{children}</div>
				</div>
			</div>
		</div>
	)
}

export default Layout
