import { IUser } from '@/types/user.types'
import { number } from 'prop-types'

export interface ICountNotifSSE {
	count: number
}

export interface INotificationSSE {
	type: 'friend_request' | 'access_request' | 'comment' | 'like'
	fromUser: { id: number; name: string; surname: string; nickname: string }
	id: number
	createDate: string
	updateDate: string
	status: 'not_read'
	count: number
}

export interface INotificationDto {
	comment: any
	createDate: string
	fromUser: IUser
	id: number
	post: any
	status: 'read' | 'not_read'
	type: 'friend_request' | 'access_request' | 'comment' | 'like'
	updateDate: string
}
