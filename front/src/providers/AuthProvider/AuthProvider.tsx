import Cookies from 'js-cookie'
import { FC, useEffect } from 'react'


import { checkAuth } from '@/store/user/user.action'
import IChildren from '@/utils/children.inteface'
import { useActions } from '@/hooks/useActions'
import { Navigate, } from 'react-router-dom'

const AuthProvider: FC<IChildren> = ({
	children,
}) => {
	const isAuth = localStorage.getItem(`auth`)
	const { logout } = useActions()

	useEffect(() => {
		const accessToken = Cookies.get(`AccessToken`)

		if (!accessToken) logout()

		accessToken && checkAuth()
	}, [])

	if (!isAuth) {
		return <Navigate to='/login' replace={true} />
	}

	return children

}

export default AuthProvider
