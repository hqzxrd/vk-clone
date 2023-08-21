import { IUser } from "./user.types"
import { number } from "prop-types"

export interface IUserChatsInfo
  extends Pick<IUser, `id` | `name` | `surname` | `avatar` | `nickname`> {}

export interface IMassegaChatId {
  id: number
}

export interface IMessage {
  author: IUserChatsInfo
  createDate: string
  updateDate: string
  id: number
  text: string
  chat: IMassegaChatId
  isChanged: boolean
  statuses: [StatusesMessage]
}

export type StatusesMessage = { isRead: boolean }

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
