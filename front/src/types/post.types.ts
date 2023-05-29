import { IUser } from './user.types'

export interface IAuthor
	extends Pick<IUser, `avatar` | `id` | `name` | `nickname` | `surname`> {}

export interface IPostDto {
	author: IAuthor
	createDate: string
	updateDate: string
	id: number
	isLike: boolean
	likes: number
	photos: string[]
	text: string
}
