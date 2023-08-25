import { IUser } from "@/types/user.types"

export const getGender = (data: Pick<IUser, `gender`>) => {
  if (!data) return <></>

  return data.gender === `female` ? `Женский` : `Мужской`
}
