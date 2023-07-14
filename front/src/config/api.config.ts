export const SERVER_URL = process.env.SERVER_URL
export const API_URL = process.env.SERVER_URL + `/api`
export const WS_URL = process.env.SERVER_URL ? process.env.SERVER_URL : ``

export const AuthUrl = (str: string) => `/auth${str}`

export const UserUrl = (str: string) => `/user${str}`

export const PostUrl = (str: string) => `/post${str}`

export const CommentUrl = (str: string) => `/comment${str}`

export const FilesUrl = (str: string) => `${SERVER_URL}/${str}`

export const FriendUrl = (str: string) => `/friend${str}`

export const notificationUrl = (str: string) => `${API_URL}/notification${str}`
