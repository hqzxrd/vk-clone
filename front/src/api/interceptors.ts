import { AuthService, removeTokensCookie } from '@/services/auth/auth.service'
import axios, { InternalAxiosRequestConfig } from 'axios'
import { error } from 'console'
import Cookies from 'js-cookie'

import { API_URL } from '@/config/api.config'

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

authAxios.interceptors.response.use(
	(config) => config,
	async (error) => {
		const request = error.config

		if (error.response.status === 401 && !error.config._isRetry) {
			error.config._isRetry = true

			try {
				await AuthService.getNewsTokens()
				return authAxios.request(request)
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
