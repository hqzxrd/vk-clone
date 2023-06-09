import { authAxios, filesAxios } from '@/api/interceptors'
import { IComment } from '@/types/post.types'

import {
	TypePostFiles,
	TypePostText,
} from '@/components/screens/profile/CreatePost/createPost.interface'

import { CommentUrl, PostUrl } from '@/config/api.config'

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

	async updatePost(
		id: number,
		text: TypePostText,
		files: TypePostFiles,
		oldPhotos: string[]
	) {
		console.log(oldPhotos)
		const formData = new FormData()

		if (files[0]) {
			files.map((file) => {
				formData.append(`newPhotos`, file, file.name)
			})
		}

		if (oldPhotos[0]) {
			oldPhotos.map((str) => {
				formData.append(`photos[]`, str)
			})
		}

		formData.append(`text`, text)

		return await filesAxios.patch(PostUrl(`/${id}`), formData)
	},

	async detelePost(id: number) {
		return await authAxios.delete(PostUrl(`/${id}`))
	},

	async likePost(id: number) {
		return await authAxios.get(PostUrl(`/like/${id}`))
	},

	async createComment(postId: number, text: string) {
		return await authAxios.post(CommentUrl(``), { postId, text })
	},

	async getCommentsByPostId(query: string) {
		return await authAxios.get<[IComment[], number]>(CommentUrl(query))
	},

	async deleteComment(commentId: number) {
		return await authAxios.delete(CommentUrl(`/${commentId}`))
	},

	async updateComment(commentId: number, text: string) {
		return await authAxios.patch(CommentUrl(`/${commentId}`), { text })
	},
}
