import { NextPageAuth } from '@/types/auth.types'

import Home from '@/components/screens/home/Home'

const HomePage: NextPageAuth = () => {
	return <Home />
}

HomePage.isOnlyUser = true

export default HomePage
