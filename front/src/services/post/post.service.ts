import { authAxios } from "@/api/interceptors"
import { IComment } from "@/types/post.types"

import {
  TypePostFiles,
  TypePostText,
} from "@/components/screens/profile/CreatePost/createPost.interface"

import { CommentUrl, PostUrl } from "@/config/api.config"

import { toastError } from "@/utils/toastError"

export const PostService = {
  async getNewsline(query: string) {
    try {
      return await authAxios.get(PostUrl(`/newsline${query}`))
    } catch (error) {
      toastError(error)
    }
  },

  async getAll(query: string) {
    try {
      return await authAxios.get(PostUrl(query))
    } catch (error) {
      toastError(error)
    }
  },

  async createPost(text: TypePostText, files: TypePostFiles) {
    try {
      const formData = new FormData()

      if (files[0]) {
        files.forEach((file, i) => {
          formData.append(`photos`, file, file.name)
        })
      }

      formData.append(`text`, text)

      return await authAxios.post(PostUrl(``), formData, {
        headers: {
          ["Content-Type"]: "multipart/form-data",
        },
      })
    } catch (error) {
      toastError(error)
    }
  },

  async updatePost(
    id: number,
    text: TypePostText,
    files: TypePostFiles,
    oldPhotos: string[]
  ) {
    try {
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

      return await authAxios.patch(PostUrl(`/${id}`), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    } catch (error) {
      toastError(error)
    }
  },

  async detelePost(id: number) {
    try {
      return await authAxios.delete(PostUrl(`/${id}`))
    } catch (error) {
      toastError(error)
    }
  },

  async likePost(id: number) {
    try {
      return await authAxios.get(PostUrl(`/like/${id}`))
    } catch (error) {
      toastError(error)
    }
  },

  async createComment(postId: number, text: string) {
    try {
      return await authAxios.post(CommentUrl(``), { postId, text })
    } catch (error) {
      toastError(error)
    }
  },

  async getCommentsByPostId(query: string) {
    try {
      return await authAxios.get<[IComment[], number]>(CommentUrl(query))
    } catch (error) {
      toastError(error)
    }
  },

  async deleteComment(commentId: number) {
    try {
      return await authAxios.delete(CommentUrl(`/${commentId}`))
    } catch (error) {
      toastError(error)
    }
  },

  async updateComment(commentId: number, text: string) {
    try {
      return await authAxios.patch(CommentUrl(`/${commentId}`), { text })
    } catch (error) {
      toastError(error)
    }
  },

  async likeComment(commentId: number) {
    try {
      return await authAxios.get(CommentUrl(`/like/${commentId}`))
    } catch (error) {
      toastError(error)
    }
  },
}
