import { authAxios } from '@/api/interceptors'

import { FriendUrl } from '@/config/api.config'

export const FriendService = {
	async sendRequest(toUserId: number) {
		return await authAxios.get(FriendUrl(`/send/${toUserId}`))
	},

	async removeFriend(UserId: number) {
		return await authAxios.delete(FriendUrl(`/${UserId}`))
	},

	async resOnFriendRequest(toUserId: number, bool: boolean) {
		const strQuery = `?isAccept=${bool}`
		return await authAxios.get(FriendUrl(`/response/${toUserId}${strQuery}`))
	},
}
