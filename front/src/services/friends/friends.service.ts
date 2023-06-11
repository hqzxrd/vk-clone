import { authAxios } from '@/api/interceptors'

import { FriendUrl } from '@/config/api.config'

export const FriendService = {
	async sendRequest(toUserId: number) {
		return await authAxios.get(FriendUrl(`/send/${toUserId}`))
	},
}
