import AuthProvider from './AuthProvider/AuthProvider'
import Toast from './Toast'
import { TypeComponentAuth } from '@/types/auth.types'
import { FC } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'

import Layout from '@/components/layout/Layout'
import SseNotif from '@/components/screens/notification/SseNotif'

import { store } from '@/store/store'

const queryClient = new QueryClient({
	defaultOptions: { queries: { refetchOnWindowFocus: false } },
})

const MainProvider: FC<TypeComponentAuth> = ({ children, Component }) => {
	return (
		<Provider store={store}>
			<Toast />
			<SseNotif />
			<QueryClientProvider client={queryClient}>
				<AuthProvider Component={Component}>
					<Layout>{children}</Layout>
				</AuthProvider>
			</QueryClientProvider>
		</Provider>
	)
}

export default MainProvider
