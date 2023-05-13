import { TypeComponentAuth } from '@/types/auth.types'
import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'

const CheckRole: FC<TypeComponentAuth> = ({
	children,
	Component: { isOnlyUser },
}) => {
	const { pathname, replace } = useRouter()
	const { isAutorized } = useAuth()

	const Children = () => <>{children}</>

	if (isAutorized && isOnlyUser) {
		return <Children />
	} else {
		pathname !== `/404` && replace(`/auth/login`)
	}

	return <div></div>
}

export default CheckRole
