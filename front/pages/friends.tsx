import { NextPageAuth } from '@/types/auth.types'
import React from 'react'

import Friends from '@/components/screens/friends/Friends'

const FriendsPage: NextPageAuth = () => {
	return <Friends />
}

FriendsPage.isOnlyUser = true

export default FriendsPage
