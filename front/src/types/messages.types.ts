import { IUser } from './user.types'

export interface IUserChatsInfo
	extends Pick<IUser, `id` | `name` | `surname` | `avatar` | `nickname`> {}

export interface IMessage {
	author: IUserChatsInfo
	createDate: string
	updateDate: string
	id: number
	text: string
}

export interface IChatItem {
	id: number
	message: IMessage
	users: [IUserChatsInfo, IUserChatsInfo]
}

export interface IChatByUserId {
	createDate: string
	updateDate: string
	id: number
	users: [IUserChatsInfo, IUserChatsInfo]
}
