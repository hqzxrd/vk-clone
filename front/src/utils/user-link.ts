import { IUser } from '@/types/user.types'

export const userLink = (user: Pick<IUser, `id` | `nickname`>) => {
	return user.nickname ? user.nickname : user.id
}

export const returnStringOrNubmer = (id: string) => {
	return isNaN(+id) ? id : +id
}
