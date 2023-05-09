import MainProvider from '@/providers/MainProvider'
import { TypeComponentAuth } from '@/types/auth.types'
import type { AppProps } from 'next/app'

import '@/assets/styles/globals.scss'
import '@/assets/styles/themes.scss'

type TypeAppProps = AppProps & TypeComponentAuth

export default function App({ Component, pageProps }: TypeAppProps) {
	return (
		<MainProvider Component={Component}>
			<Component {...pageProps} />
		</MainProvider>
	)
}
