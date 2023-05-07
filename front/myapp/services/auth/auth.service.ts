import { baseAxios } from '@/api/interceptors'
import { IUser } from '@/types/user.types'
import Cookies from 'js-cookie'

import { AuthUrl } from '@/config/api.config'

import { IAuthResponse, ITokens, IUserDto } from '@/store/user/user.interface'

export const AuthService = {
	async register(user: IUserDto) {
		const res = await baseAxios.post<IAuthResponse>(
			AuthUrl(`/registration`),
			user
		)
		if (res.data.accessToken) saveToStorage(res.data)

		return res
	},

	async login(email: string, password: string) {
		const res = await baseAxios.post<IAuthResponse>(AuthUrl(`/login`), {
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

	async code(code: number, email: string) {
		const res = await baseAxios.post<IAuthResponse>(AuthUrl(`/code`), {
			code,
			email,
		})

		if (res.status === 204) {
			const userStr = localStorage.getItem(`user`)
			const user: IUser = userStr && JSON.parse(userStr)
			user.isAuth = true
			localStorage.setItem(`user`, JSON.stringify(user))
		}

		return res
	},

	async getNewsTokens() {
		const refreshToken = Cookies.get(`refreshToken`)

		const res = await baseAxios.post<IAuthResponse>(
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
