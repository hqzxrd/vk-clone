import { baseAxios } from "@/api/interceptors"
import {
  ILoginRegisterResponse,
  IRegisterFieldsDto,
  IUserDto,
} from "@/types/auth.types"
import Cookies from "js-cookie"

import { AuthUrl } from "@/config/api.config"

import { initialUser } from "@/store/user/user.slice"
import { setAuthStore } from "@/utils/local-storage"

export const AuthService = {
  async confirmation(email: string) {
    const res = await baseAxios.post<void>(AuthUrl(`/confirmation`), {
      email,
    })

    if (res?.status === 204) {
      updateStorage(`user`, { email })
    }

    return res
  },

  async code(code: number, email: string) {
    const res = await baseAxios.post<void>(AuthUrl(`/code`), {
      code,
      email,
    })

    return res
  },

  async register(user: IRegisterFieldsDto) {
    const res = await baseAxios.post<ILoginRegisterResponse>(
      AuthUrl(`/registration`),
      user
    )
    if (res.data.accessToken) {
      saveToStorage(res.data)
    }

    return res
  },

  async login(email: string, password: string) {
    const res = await baseAxios.post<ILoginRegisterResponse>(
      AuthUrl(`/login`),
      {
        email,
        password,
      }
    )

    if (res.data.accessToken) {
      saveToStorage(res.data)
    }

    return res
  },

  logout() {
    baseAxios.get(AuthUrl(`/logout`))
    Cookies.remove(`AccessToken`)
    localStorage.removeItem(`user`)
    setAuthStore(false)
  },

  async getNewsTokens() {
    const res = await baseAxios.get(AuthUrl(`/refresh`))

    if (res.data.accessToken) {
      Cookies.set(`AccessToken`, res.data.accessToken)
    }

    return res
  },
}

const saveToStorage = (data: ILoginRegisterResponse) => {
  Cookies.set(`AccessToken`, data.accessToken)
  localStorage.setItem(`user`, JSON.stringify(data.user))
}

const updateStorage = (str: string, prop: Partial<IUserDto>) => {
  const userStr = localStorage.getItem(`user`)
  if (userStr) {
    const user: IUserDto = { ...JSON.parse(userStr), ...prop }

    localStorage.setItem(str, JSON.stringify(user))
  } else {
    const user: IUserDto = {
      ...initialUser,
      ...prop,
    }
    localStorage.setItem(str, JSON.stringify(user))
  }
}
