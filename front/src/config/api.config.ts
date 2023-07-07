export const API_URL = process.env.API_URL
export const WS_URL = process.env.SERVER_URL ? process.env.SERVER_URL : ``

export const AuthUrl = (str: string) => `/auth${str}`

export const UserUrl = (str: string) => `/user${str}`

export const PostUrl = (str: string) => `/post${str}`

export const CommentUrl = (str: string) => `/comment${str}`

export const FilesUrl = (str: string) => `${API_URL}/file/${str}`

export const FriendUrl = (str: string) => `/friend${str}`

export const notificationUrl = (str: string) => `${API_URL}/notification${str}`
