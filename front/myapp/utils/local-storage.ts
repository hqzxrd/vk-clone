import { IUser } from '@/types/user.types'

export const getUserLocalStore = (name: string): IUser | null => {
	if (process.browser) {
		const ls = localStorage.getItem(name)
		return ls ? JSON.parse(ls) : null
	}

	return null
}

export const getAutorizeStatusLocalStore = (name: string): boolean => {
	if (process.browser) {
		const ls = localStorage.getItem(name)
		return ls ? JSON.parse(ls) : false
	}

	return false
}
