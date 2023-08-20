import { TypeGender } from "./auth.types"

export type Relationship = "none" | "friend" | "incoming" | "outgoing"

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
  countFriends: number
  countIncomingRequests: number
  typeRelationship: Relationship
  checkMark: boolean
}
