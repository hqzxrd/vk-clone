import { baseAxios } from '@/api/interceptors'
import {
	ILoginRegisterResponse,
	IRegisterFieldsDto,
	ITokens,
	IUserDto,
} from '@/types/auth.types'
import { IUser } from '@/types/user.types'
import Cookies from 'js-cookie'

import { AuthUrl } from '@/config/api.config'

import { initialUser } from '@/store/user/user.slice'

export const AuthService = {
	async confirmation(email: string) {
		const res = await baseAxios.post<void>(AuthUrl(`/confirmation`), {
			email,
		})

		if (res.status === 204) {
			updateStorage(`user`, { email })
		}

		return res
	},

	async code(code: number, email: string) {
		const res = await baseAxios.post<void>(AuthUrl(`/code`), {
			code,
			email,
		})

		return res
	},

	async register(user: IRegisterFieldsDto) {
		const res = await baseAxios.post<ILoginRegisterResponse>(
			AuthUrl(`/registration`),
			user
		)
		if (res.data.accessToken) {
			saveToStorage(res.data)
		}

		return res
	},

	async login(email: string, password: string) {
		const res = await baseAxios.post<ILoginRegisterResponse>(
			AuthUrl(`/login`),
			{
				email,
				password,
			}
		)
		if (res.data.accessToken) saveToStorage(res.data)

		return res
	},

	logout() {
		removeTokensCookie()
		localStorage.removeItem(`user`)
		localStorage.removeItem(`isAutorized`)
	},

	async getNewsTokens() {
		const refreshToken = Cookies.get(`refreshToken`)

		const res = await baseAxios.post<ILoginRegisterResponse>(
			AuthUrl(`/refresh`),
			{ token: refreshToken },
			{ headers: { 'Content-Type': `application/json` } }
		)

		if (res.data.accessToken) saveToStorage(res.data)

		return res
	},
}

const saveToStorage = (data: ILoginRegisterResponse) => {
	saveTokenCookie(data)
	localStorage.setItem(`user`, JSON.stringify(data.user))
	localStorage.setItem(`isAutorized`, JSON.stringify(true))
}

const updateStorage = (str: string, prop: Partial<IUserDto>) => {
	const userStr = localStorage.getItem(`user`)
	if (userStr) {
		const user: IUserDto = { ...JSON.parse(userStr), ...prop }

		localStorage.setItem(str, JSON.stringify(user))
	} else {
		const user: IUserDto = {
			...initialUser,
			...prop,
		}
		localStorage.setItem(str, JSON.stringify(user))
	}
}

const saveTokenCookie = (data: ITokens) => {
	Cookies.set(`AccessToken`, data.accessToken)
	Cookies.set(`RefreshToken`, data.refreshToken)
}

export const removeTokensCookie = () => {
	Cookies.remove(`AccessToken`)
	Cookies.remove(`RefreshToken`)
}
