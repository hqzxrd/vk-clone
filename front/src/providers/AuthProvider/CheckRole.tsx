import { TypeComponentAuth } from '@/types/auth.types'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

import { useTypedSelector } from '@/hooks/useTypedSelector'

const CheckRole: FC<TypeComponentAuth> = ({
	children,
	Component: { isOnlyUser },
}) => {
	const { pathname, replace } = useRouter()
	const isAuth = localStorage.getItem(`auth`)
	const { isAuth: reduxAuth } = useTypedSelector((st) => st.user)
	if (isAuth && isOnlyUser) {
		return <>{children}</>
	} else {
		// reduxAuth(null)
		pathname !== `/auth/login` && replace(`/auth/login`)
	}

	return null
}

export default CheckRole
