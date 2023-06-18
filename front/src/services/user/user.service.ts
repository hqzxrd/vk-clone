import { authAxios, baseAxios, filesAxios } from '@/api/interceptors'
import { IUser } from '@/types/user.types'

import { IUpdateFieldsDto } from '@/components/screens/profileEdit/profileEdit.interface'

import { UserUrl } from '@/config/api.config'

export const UserService = {
	async getById(id: number) {
		return await authAxios.get<IUser>(UserUrl(`/${id}`))
	},

	async getAll() {
		return await baseAxios.get<IUser[]>(UserUrl(``))
	},

	async updateProfile(data: IUpdateFieldsDto, file: File | null) {
		if (!file) {
			return await authAxios.patch<IUser>(UserUrl(``), data)
		} else {
			const formData = new FormData()
			formData.append('avatar', file)

			Object.entries(data).forEach(([key, value]) => {
				formData.append(key, value)
			})
			console.log(formData)
			return await filesAxios.patch(UserUrl(``), formData)
		}
	},

	async getFriends(id: number) {
		return await baseAxios.get<[IUser[], number]>(UserUrl(`/${id}/friends`))
	},

	async getRequest(type: string) {
		const res = await authAxios.get<[IUser[], number]>(
			UserUrl(`/request?type=${type}`)
		)
		return res
	},
}
