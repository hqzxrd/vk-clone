import { AuthService } from '@/services/auth/auth.service'
import axios, { InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'
import { toast } from 'react-hot-toast'

import Error from '@/components/ui/CustomToast/ErrorToast'

import { API_URL, WS_URL } from '@/config/api.config'

import { toastError } from '@/utils/toastError'

export const baseAxios = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': `application/json`,
	},
	withCredentials: true,
})

export const authAxios = axios.create({
	baseURL: API_URL,
})

authAxios.interceptors.request.use((config) => checkAuth(config))

let isRetry = false
const retrySubscribers: any = []

authAxios.interceptors.response.use(
	(config) => config,
	async (error: any) => {
		const {
			config,
			response: { status },
		} = error
		const originalRequest = config

		if (status === 401) {
			try {
				const retryOrigReq = new Promise((resolve) => {
					retrySubscribers.push(() => {
						resolve(authAxios.request(originalRequest))
					})
				})

				if (!isRetry) {
					isRetry = true
					await AuthService.getNewsTokens().then(() => {
						isRetry = false
						retrySubscribers.map((cb: any) => cb())
						retrySubscribers.length = 0
					})
				}

				return await retryOrigReq
			} catch (err) {
				AuthService.logout()
				Error(`Сессия истекла`)
			}
		}
	}
)

function checkAuth(config: InternalAxiosRequestConfig<any>) {
	const accessToken = Cookies.get(`AccessToken`)

	if (config.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
}
