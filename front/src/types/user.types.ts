import { TypeGender } from './auth.types'

export interface IUser {
	id: number
	createDate: string
	name: string
	surname: string
	birthday: string
	gender: TypeGender
	city: string | null
	status: string | null
	nickname: string | null
	avatar: string | null
}
