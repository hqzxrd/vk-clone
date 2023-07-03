import { authAxios, baseAxios, filesAxios } from '@/api/interceptors'
import { IUser } from '@/types/user.types'

import { IUpdateFieldsDto } from '@/components/screens/profileEdit/profileEdit.interface'

import { UserUrl } from '@/config/api.config'

import { toastError } from '@/utils/toastError'

export const UserService = {
	async getById(id: number) {
		try {
			return await authAxios.get<IUser>(UserUrl(`/${id}`))
		} catch (error) {
			toastError(error)
			throw new Error(`qwe`)
		}
	},

	async getAll() {
		try {
			return await baseAxios.get<IUser[]>(UserUrl(``))
		} catch (error) {
			toastError(error)
		}
	},

	async updateProfile(data: IUpdateFieldsDto, file: File | null) {
		try {
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
		} catch (error) {
			toastError(error)
		}
	},

	async getFriends(id: number) {
		try {
			return await baseAxios.get<[IUser[], number]>(UserUrl(`/${id}/friends`))
		} catch (error) {
			toastError(error)
		}
	},

	async getRequest(type: string) {
		try {
			const res = await authAxios.get<[IUser[], number]>(
				UserUrl(`/request?type=${type}`)
			)
			return res
		} catch (error) {
			toastError(error)
		}
	},
}
