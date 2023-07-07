import { NextPageAuth } from '@/types/auth.types'
import React from 'react'

import Profile from '@/components/screens/profile/Profile'

const ProfilePage: NextPageAuth = () => {
	return <Profile />
}

ProfilePage.isOnlyUser = true

export default ProfilePage
