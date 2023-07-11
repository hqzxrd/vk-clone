import { authAxios } from '@/api/interceptors'

import { FriendUrl } from '@/config/api.config'

import { toastError } from '@/utils/toastError'

export const FriendService = {
	async sendRequest(toUserId: number) {
		try {
			return await authAxios.get(FriendUrl(`/send/${toUserId}`))
		} catch (error) {
			toastError(error)
		}
	},

	async cancelRequest(UserId: number) {
		try {
			return await authAxios.get(FriendUrl(`/cancel/${UserId}`))
		} catch (error) {
			toastError(error)
		}
	},

	async removeFriend(UserId: number) {
		try {
			return await authAxios.delete(FriendUrl(`/${UserId}`))
		} catch (error) {
			toastError(error)
		}
	},

	async resOnFriendRequest(toUserId: number, bool: boolean) {
		const strQuery = `?isAccept=${bool}`
		try {
			return await authAxios.get(FriendUrl(`/response/${toUserId}${strQuery}`))
		} catch (error) {
			toastError(error)
		}
	},
}
