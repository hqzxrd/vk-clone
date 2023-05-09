import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang="ru">
			<Head>
				<title>Вконтакте</title>
				<link rel="" href="/vk_logo.ico" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0"
				/>
				<meta
					httpEquiv="Cache-Control"
					content="no-cache, no-store, must-revalidate"
				/>
				<meta httpEquiv="Pragma" content="no-cache" />
				<meta httpEquiv="Expires" content="0"></meta>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
