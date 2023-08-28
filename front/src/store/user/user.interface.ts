import { IUserDto } from "@/types/auth.types"

export interface IInitialState {
  user: IUserDto
  isAuth: boolean
  isLoading: boolean
  notifications: INotifications
}

export interface INotifications {
  notificationCount: number
  notificationIncomingCount: number
}
