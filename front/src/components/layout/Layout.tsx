import Header from './Header/Header'
import Navigation from './Navigation/Navigation'
import { FC } from 'react'

import { useTypedSelector } from '@/hooks/useTypedSelector'

import IChildren from '@/utils/children.inteface'

import styles from './Layout.module.scss'
import { useLocation } from 'react-router-dom'

function isHideNavbar(path: string) {
	return path === '/register' ||
		path === '/login' ||
		path === '/404' ||
		path === '/500' ? null : (
		<Navigation />
	)

}

const Layout: FC<IChildren> = ({ children }) => {
	const { pathname } = useLocation();
	const { theme } = useTypedSelector((state) => state.theme)

	return (
		<div className={styles.layout} data-theme={theme}>
			<div className={styles.header_wrapper}>
				<Header />
			</div>

			<div className={styles.main_wrapper}>
				<div className={styles.main}>
					<div className={styles.left}>{isHideNavbar(pathname)}</div>
					<div className={styles.center}>{children}</div>
				</div>
			</div>
		</div>
	)
}

export default Layout
