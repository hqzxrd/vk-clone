import { IUserDto } from "@/types/auth.types"

import { TypeTheme } from "@/store/theme/theme.slice"

export const getUserStore = (): IUserDto | null => {
  const ls = localStorage.getItem(`user`)
  return ls ? JSON.parse(ls) : null
}

export const setAuthStore = (boolean: boolean): void => {
  localStorage.setItem(`Auth`, JSON.stringify(boolean))
}

export const getAuthStore = (): boolean => {
  const ls = localStorage.getItem(`Auth`)
  return ls ? JSON.parse(ls) : false
}

export const saveTheme = (name: `theme`, theme: TypeTheme): void => {
  localStorage.setItem(name, theme)
}

export const getTheme = (name: string): TypeTheme | null => {
  const ls = localStorage.getItem(name) as TypeTheme
  return ls ? ls : null
}
