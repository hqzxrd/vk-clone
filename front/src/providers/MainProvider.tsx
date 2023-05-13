import AuthProvider from './AuthProvider/AuthProvider'
import ReduxToast from './ReduxToast'
import { TypeComponentAuth } from '@/types/auth.types'
import { FC } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'

import Layout from '@/components/layout/Layout'

import { store } from '@/store/store'

const MainProvider: FC<TypeComponentAuth> = ({ children, Component }) => {
	return (
		<Provider store={store}>
			<ReduxToast />
			<Layout>
				<AuthProvider Component={Component}>{children}</AuthProvider>
			</Layout>
		</Provider>
	)
}

export default MainProvider
