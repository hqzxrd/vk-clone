import { NextPageAuth } from '@/types/auth.types'
import React from 'react'

import News from '@/components/screens/news/News'

const NewsPage: NextPageAuth = () => {
	return <News />
}

NewsPage.isOnlyUser = true

export default NewsPage
