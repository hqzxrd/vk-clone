import { authAxios } from '@/api/interceptors'

import { notificationUrl } from '@/config/api.config'

export const NotificationService = {
	async getAllNotifications() {
		return await authAxios.get(notificationUrl(``))
	},
}
