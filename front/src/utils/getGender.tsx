import { IUser } from "@/types/user.types"

export const getGender = (data: Pick<IUser, `gender`>) => {
  if (!data) {
    return <></>
  }

  if (data.gender === `female`) {
    return `Женский`
  } else {
    return `Мужской`
  }
}
