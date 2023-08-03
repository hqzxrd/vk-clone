import { IUserDto } from '@/types/auth.types'

import { TypeTheme } from '@/store/theme/theme.slice'

export const getUserLocalStore = (name: string): IUserDto | null => {
	const ls = localStorage.getItem(name)
	return ls ? JSON.parse(ls) : null

}

export const getAuthStatusLocalStore = (name: string): true | null => {
	const ls = localStorage.getItem(name)
	return ls ? JSON.parse(ls) : false

}

export const saveTheme = (name: `theme`, theme: TypeTheme): void => {
	const ls = localStorage.setItem(name, theme)
}

export const getTheme = (name: string): string | null => {

	const ls = localStorage.getItem(name)
	return ls ? ls : null

}
