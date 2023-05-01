import ReduxToast from './ReduxToast'
import { FC } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'

import Layout from '@/components/layout/Layout'

import { store } from '@/store/store'

import IChildren from '@/utils/children.inteface'

const queryClient = new QueryClient({})

const MainProvider: FC<IChildren> = ({ children }) => {
	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<ReduxToast />
				<Layout>{children}</Layout>
			</QueryClientProvider>
		</Provider>
	)
}

export default MainProvider
