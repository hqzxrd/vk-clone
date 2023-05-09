import { baseAxios } from '@/api/interceptors'
import { IUser } from '@/types/user.types'
import Cookies from 'js-cookie'

import { AuthUrl } from '@/config/api.config'

import { IAuthResponse, ITokens, IUserDto } from '@/store/user/user.interface'
import { initialUser } from '@/store/user/user.slice'

export const AuthService = {
	async confirmation(email: string) {
		const res = await baseAxios.post<IAuthResponse>(AuthUrl(`/confirmation`), {
			email,
		})

		if (res.status === 204) {
			updateStorage(`user`, { email })
		}

		return res
	},

	async code(code: number, email: string) {
		const res = await baseAxios.post<IAuthResponse>(AuthUrl(`/code`), {
			code,
			email,
		})

		if (res.status === 204) {
			updateStorage(`user`, { isAuth: true })
		}

		return res
	},

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

const saveToStorage = (data: IAuthResponse) => {
	saveTokenCookie(data)
	localStorage.setItem(`user`, JSON.stringify(data.user))
}

const updateStorage = (str: string, prop: Partial<IUser>) => {
	const userStr = localStorage.getItem(`user`)
	if (userStr) {
		const user: IUser = { ...JSON.parse(userStr), ...prop }

		localStorage.setItem(str, JSON.stringify(user))
	} else {
		const user: IUser = {
			...initialUser,
			...prop,
		}
		localStorage.setItem(str, JSON.stringify(user))
	}
}

const saveTokenCookie = (data: ITokens) => {
	Cookies.set(`AccessToken`, data.accessToken)
	Cookies.set(`AccessToken`, data.refreshToken)
}

const removeTokensCookie = () => {
	Cookies.remove(`AccessToken`)
	Cookies.remove(`AccessToken`)
}
