import Header from './Header/Header'
import Navigation from './Navigation/Navigation'
import { useRouter } from 'next/router'
import { FC, useRef } from 'react'

import { useDarkTheme } from '@/hooks/useDarkTheme'

import IChildren from '@/utils/children.inteface'

import styles from './Layout.module.scss'

function isHideNavbar() {
	const router = useRouter()

	const path = router.pathname
	return path === '/register' || path === '/login' ? `` : <Navigation />
}

const Layout: FC<IChildren> = ({ children }) => {
	const ref = useRef<HTMLDivElement>(null)

	const { theme, toggle } = useDarkTheme(ref)

	return (
		<div className={styles.layout} ref={ref}>
			<div className={styles.header_wrapper}>
				<Header toggleTheme={toggle} />
			</div>
			<div className={styles.main_wrapper}>
				<div className={styles.main}>
					<div className={styles.left}>{isHideNavbar()}</div>
					<div className={styles.center}>{children}</div>
				</div>
			</div>
		</div>
	)
}

export default Layout
