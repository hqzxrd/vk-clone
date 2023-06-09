import { IUser } from './user.types'

export interface IAuthor
	extends Pick<IUser, `avatar` | `id` | `name` | `nickname` | `surname`> {}

export interface IPost {
	author: IAuthor
	createDate: string
	updateDate: string
	id: number
	isLike: boolean
	countLikes: number
	countComments: number
	photos: string[]
	text: string
}

export interface IComment {
	author: IAuthor
	post: IPost
	createDate: string
	updateDate: string
	id: number
	isLike: boolean
	likes: number
	text: string
}
