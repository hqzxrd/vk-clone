import { AuthService } from '@/services/auth/auth.service'
import axios, { InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'
import io from 'socket.io-client'

import { API_URL, WS_URL } from '@/config/api.config'

import { toastError } from '@/utils/toastError'

const token = Cookies.get(`AccessToken`)
export const socket = io(WS_URL, {
	auth: { token: token },
	autoConnect: false,
})

export const baseAxios = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': `application/json`,
	},
	withCredentials: true,
})

export const authAxios = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': `application/json`,
	},
})

export const filesAxios = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'multipart/form-data',
	},
})

filesAxios.interceptors.request.use((config) => checkAuth(config))

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
				toastError(err, `Авторизация закончилась`)
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
