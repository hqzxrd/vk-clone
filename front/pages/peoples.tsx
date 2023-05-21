import { NextPageAuth } from '@/types/auth.types'
import React from 'react'

import Peoples from '@/components/screens/peoples/Peoples'

const PeoplesPage: NextPageAuth = () => {
	return <Peoples />
}

PeoplesPage.isOnlyUser = true

export default PeoplesPage
