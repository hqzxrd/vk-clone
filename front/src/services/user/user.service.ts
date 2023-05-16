import { baseAxios } from '@/api/interceptors'
import { IUser } from '@/types/user.types'

import { UserUrl } from '@/config/api.config'

export const UserService = {
	async getById(id: number) {
		return await baseAxios.get<IUser>(UserUrl(`/${id}`))
	},

	async getAll() {
		return await baseAxios.get<IUser[]>(UserUrl(``))
	},

	async updateProfile(data: IUser) {
		return await baseAxios.patch<IUser>(UserUrl(``), data)
	},
}
