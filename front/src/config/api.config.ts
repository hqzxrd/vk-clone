export const API_URL = process.env.API_URL

export const AuthUrl = (str: string) => `/auth${str}`

export const UserUrl = (str: string) => `/user${str}`

export const FilesUrl = (str: string) => `${API_URL}/file/${str}`
