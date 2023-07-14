import { IUser } from '@/types/user.types'

export interface IAvatarMiniProps {
	user: Pick<IUser, `avatar` | `name` | `id` | `nickname`>
	width: number
	height: number
	isLink: boolean
	image?: string
}
