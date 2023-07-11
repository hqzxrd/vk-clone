import { NextPageAuth } from '@/types/auth.types'
import React from 'react'

import UserDialog from '@/components/screens/messanger/UserDialog/UserDialog'

const UserDialogPage: NextPageAuth = () => {
	return <UserDialog />
}

UserDialogPage.isOnlyUser = true
UserDialogPage
export default UserDialogPage
