import { baseAxios } from '@/api/interceptors'

import { PostUrl } from '@/config/api.config'

export const PostService = {
	async createPost(data: { text: string }, files: File[]) {
		if (!files) {
			return await baseAxios.post(PostUrl(``), data)
		} else {
			const formData = new FormData()
			// formData.append('photos', files)

			Object.entries(data).forEach(([key, value]) => {
				formData.append(key, value)
			})

			return await baseAxios.post(PostUrl(``), formData)
		}
	},
}
