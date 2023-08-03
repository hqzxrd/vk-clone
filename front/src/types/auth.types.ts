// export type TypeRole = {
// 	isOnlyUser?: boolean
// }

export interface IUserDto {
	id: number
	email?: string
	name: string
	surname: string
	avatar: string | null
	nickname: string
}

export type TypeGender = `male` | `female`

export interface ITokens {
	accessToken: string
	refreshToken: string
}

export interface ILoginFields {
	email: string
	password: string
}

export interface IUserInfoFields {
	name: string
	surname: string
	birthday: string
	gender: TypeGender
}

export interface IRegisterFieldsDto extends IUserInfoFields, ILoginFields { }

export interface ICodeEmailDto {
	code: number
	email: string
}

export interface ILoginRegisterResponse extends ITokens {
	user: IUserDto
}
