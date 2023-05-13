import { NextPageAuth } from '@/types/auth.types'
import React from 'react'

import Messanger from '@/components/screens/messanger/Messanger'

const LoginPage: NextPageAuth = () => {
	return <Messanger />
}

LoginPage.isOnlyUser = true

export default LoginPage
