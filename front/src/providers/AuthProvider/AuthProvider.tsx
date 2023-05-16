import { TypeComponentAuth } from '@/types/auth.types'
import Cookies from 'js-cookie'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'

import { checkAuth } from '@/store/user/user.action'

const AuthProvider: FC<TypeComponentAuth> = ({
	children,
	Component: { isOnlyUser },
}) => {
	const DynamicCheckRole = dynamic(() => import(`./CheckRole`), { ssr: false })

	const { pathname } = useRouter()
	const { isAutorized } = useAuth()
	const { logout } = useActions()

	useEffect(() => {
		const accessToken = Cookies.get(`AccessToken`)
		if (accessToken) checkAuth()
	}, [])

	useEffect(() => {
		const refreshToken = Cookies.get(`RefreshToken`)
		if (!refreshToken && isAutorized) logout()
	}, [pathname])

	return !isOnlyUser ? (
		<>{children}</>
	) : (
		<DynamicCheckRole
			Component={{
				isOnlyUser,
			}}
		>
			{children}
		</DynamicCheckRole>
	)
}

export default AuthProvider