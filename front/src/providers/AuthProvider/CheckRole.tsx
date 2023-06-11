import { TypeComponentAuth } from '@/types/auth.types'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

const CheckRole: FC<TypeComponentAuth> = ({
	children,
	Component: { isOnlyUser },
}) => {
	const { pathname, replace } = useRouter()
	const isAuth = localStorage.getItem(`isAutorized`)
	if (isAuth && isOnlyUser) {
		return <>{children}</>
	} else {
		pathname !== `/404` && replace(`/auth/login`)
	}

	return <div>{pathname}</div>
}

export default CheckRole
