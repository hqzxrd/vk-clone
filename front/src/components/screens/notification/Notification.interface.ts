import { IComment, IPost } from '@/types/post.types'
import { IUser } from '@/types/user.types'
import { number } from 'prop-types'

export interface ICountNotifSSE {
	count: number
}

export interface INotificationSSE {
	type: 'friend_request' | 'access_request' | 'comment' | 'like_post'
	fromUser: Pick<IUser, `id` | `name` | `surname` | `nickname` | `avatar`>
	id: number
	createDate: string
	updateDate: string
	status: 'not_read'
	count: number
	countRequestFriendNotification: number
}

export interface INotificationDto {
	comment?: ICommentNotifDto
	createDate: string
	fromUser: Pick<IUser, `id` | `avatar` | `name` | `surname` | `nickname`>
	id: number
	post?: Pick<IPost, `createDate` | `id` | `text`>
	status: 'read' | 'not_read'
	type: 'friend_request' | 'access_request' | 'comment' | 'like'
	updateDate: string
}

export interface ICommentNotifDto
	extends Pick<IComment, `createDate` | `id` | `text`> {
	post: Pick<IPost, `createDate` | `id`>
}
