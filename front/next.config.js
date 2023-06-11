/** @type {import('next').NextConfig} */
const nextConfig = {
	swcMinify: true,
	experimental: {
		appDir: true,
	},
	env: {
		API_URL: process.env.API_URL,
	},
	images: {
		domains: ['localhost', `109.184.83.104`],
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
