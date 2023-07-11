import { authAxios } from '@/api/interceptors'

import { notificationUrl } from '@/config/api.config'

import { toastError } from '@/utils/toastError'

export const NotificationService = {
	async getAllNotifications() {
		try {
			return await authAxios.get(notificationUrl(``))
		} catch (error) {
			toastError(error)
		}
	},
}
