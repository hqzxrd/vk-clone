import { authAxios, filesAxios } from '@/api/interceptors'

import {
	TypePostFiles,
	TypePostText,
} from '@/components/screens/profile/CreatePost/createPost.interface'

import { PostUrl } from '@/config/api.config'

export const PostService = {
	async getAll(query: string) {
		return await filesAxios.get(PostUrl(query))
	},

	async createPost(text: TypePostText, files: TypePostFiles) {
		const formData = new FormData()

		if (files[0]) {
			files.forEach((file, i) => {
				formData.append(`photos`, file, file.name)
			})
		}

		formData.append(`text`, text)

		return await filesAxios.post(PostUrl(``), formData)
	},

	async detelePost(id: number) {
		return await authAxios.delete(PostUrl(`/${id}`))
	},

	async likePost(id: number) {
		return await authAxios.get(PostUrl(`/like/${id}`))
	},
}
