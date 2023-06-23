import { IUser } from '@/types/user.types'

export interface INotification {
	type: 'friend_request' | 'comment' | 'access_request' | 'like'
	fromUser: { id: number }
	user: { id: number }
	id: number
	createDate: string
	updateDate: string
	status: 'not_read'
}

export interface INotificationDto {
	comment: any
	createDate: string
	fromUser: IUser
	id: number
	post: any
	status: 'read' | 'not_read'
	type: 'friend_request' | 'comment' | 'access_request' | 'like'
	updateDate: string
}
