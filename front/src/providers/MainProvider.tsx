import AuthProvider from './AuthProvider/AuthProvider'
import ReduxToast from './ReduxToast'
import { TypeComponentAuth } from '@/types/auth.types'
import { FC } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'

import Layout from '@/components/layout/Layout'

import { store } from '@/store/store'

const queryClient = new QueryClient()

const MainProvider: FC<TypeComponentAuth> = ({ children, Component }) => {
	return (
		<Provider store={store}>
			<ReduxToast />
			<QueryClientProvider client={queryClient}>
				<Layout>
					<AuthProvider Component={Component}>{children}</AuthProvider>
				</Layout>
			</QueryClientProvider>
		</Provider>
	)
}

export default MainProvider
