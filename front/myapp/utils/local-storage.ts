import { IUser } from '@/types/user.types'

export const getStoreLocal = (name: string): IUser | null => {
	if (process.browser) {
		const ls = localStorage.getItem(name)
		return ls ? JSON.parse(ls) : null
	}

	return null
}
