import { newAxios } from '@/api/interceptors'
import Cookies from 'js-cookie'

import { AuthUrl } from '@/config/api.config'

import { IAuthResponse, ITokens } from '@/store/user/user.interface'

export const AuthService = {
	async register(email: string, password: string) {
		const res = await newAxios.post<IAuthResponse>(AuthUrl(`/registration`), {
			email,
			password,
		})
		if (res.data.accessToken) saveToStorage(res.data)

		return res
	},

	async login(email: string, password: string) {
		const res = await newAxios.post<IAuthResponse>(AuthUrl(`/login`), {
			email,
			password,
		})
		if (res.data.accessToken) saveToStorage(res.data)

		return res
	},

	logout() {
		removeTokensCookie()
		localStorage.removeItem(`user`)
	},

	async getNewsTokens() {
		const refreshToken = Cookies.get(`refreshToken`)

		const res = await newAxios.post<IAuthResponse>(
			AuthUrl(`/login/access-token`),
			{ refreshToken },
			{ headers: { 'Content-Type': `application/json` } }
		)

		if (res.data.accessToken) saveToStorage(res.data)

		return res
	},
}

const saveTokenCookie = (data: ITokens) => {
	Cookies.set(`AccessToken`, data.accessToken)
	Cookies.set(`AccessToken`, data.refreshToken)
}

const saveToStorage = (data: IAuthResponse) => {
	saveTokenCookie(data)
	localStorage.setItem(`user`, JSON.stringify(data.user))
}

const removeTokensCookie = () => {
	Cookies.remove(`AccessToken`)
	Cookies.remove(`AccessToken`)
}
