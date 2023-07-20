/** @type {import('next').NextConfig} */
const nextConfig = {
	swcMinify: true,
	experimental: {
		appDir: true,
	},
	env: {
		API_URL: process.env.API_URL,
		CLIENT_URL: process.env.CLIENT_URL,
		SERVER_URL: process.env.SERVER_URL,
	},
	images: {
		domains: ['localhost', `79.126.5.70`],
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '',
				pathname: 'api/file/**',
			},
		],
	},
}

module.exports = nextConfig
