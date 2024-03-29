import { authAxios, baseAxios } from "@/api/interceptors"
import { IUser } from "@/types/user.types"

import { IUpdateFieldsDto } from "@/components/screens/profileEdit/profileEdit.interface"

import { UserUrl } from "@/config/api.config"

import { toastError } from "@/utils/toastError"

export const UserService = {
  async getById(id: number | string) {
    try {
      return await authAxios.get<IUser>(UserUrl(`/${id}`))
    } catch (error) {
      toastError(error)
    }
  },

  async getAll() {
    try {
      return await authAxios.get<IUser[]>(UserUrl(``))
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
        formData.append("avatar", file)

        Object.entries(data).forEach(([key, value]) => {
          formData.append(key, value)
        })
        return await authAxios.patch(UserUrl(``), formData)
      }
    } catch (error) {
      toastError(error)
    }
  },

  async deleteAvatar() {
    return await authAxios.delete(UserUrl(``))
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
