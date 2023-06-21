import { TypeComponentAuth } from '@/types/auth.types'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

import { useActions } from '@/hooks/useActions'

const CheckRole: FC<TypeComponentAuth> = ({
	children,
	Component: { isOnlyUser },
}) => {
	const { pathname, replace } = useRouter()
	const isAuth = localStorage.getItem(`auth`)
	const { logout } = useActions()

	if (isAuth && isOnlyUser) {
		return <>{children}</>
	} else {
		logout()
		pathname !== `/auth/login` && replace(`/auth/login`)
	}

	return null
}

export default CheckRole
