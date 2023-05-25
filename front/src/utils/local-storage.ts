import { IUserDto } from '@/types/auth.types'

import { TypeTheme } from '@/store/theme/theme.slice'

export const getUserLocalStore = (name: string): IUserDto | null => {
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

export const saveTheme = (name: `theme`, theme: TypeTheme): void => {
	if (process.browser) {
		const ls = localStorage.setItem(name, theme)
	}
}

export const getTheme = (name: string): string | null => {
	if (process.browser) {
		const ls = localStorage.getItem(name)
		return ls ? ls : null
	}

	return null
}
