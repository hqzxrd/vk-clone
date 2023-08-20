import { IUser } from "@/types/user.types"
import { FC } from "react"

import AvatarMini from "@/components/ui/AvatarMini/AvatarMini"

import { userLink } from "@/utils/user-link"

import styles from "./item.module.scss"
import { NavLink } from "react-router-dom"
import GenderIcon from "@/components/ui/Icons/Profile/GenderIcon"
import { getGender } from "@/utils/getGender"
import UserLinkIcon from "@/components/ui/Icons/Profile/UserLinkIcon"
import CityIcon from "@/components/ui/Icons/Profile/CityIcon"
import { date } from "@/utils/date"
import BirthdayIcon from "@/components/ui/Icons/Profile/BirthdayIcon"
import { CheckmarkIcon } from "react-hot-toast"

const Item: FC<{ user: IUser }> = ({ user }) => {
  const { year, month, day } = date(user.birthday)

  return (
    <div className={styles.peoples_item}>
      <AvatarMini user={user} width={90} height={90} isLink={true} />
      <div className={styles.info}>
        <NavLink to={`/${userLink(user)}`} className={styles.name}>
          <div>{`${user.name} ${user.surname}`}</div>
          <div className={styles.checkMark}>
            {user.checkMark && (
              <CheckmarkIcon className={styles.checkMarkIcon} />
            )}
          </div>
          <div className={styles.nickname}>
            <UserLinkIcon />
            {user.nickname
              ? user.nickname
              : import.meta.env.VITE_CLIENT_URL + `/${user.id}`}
          </div>
        </NavLink>
        <div className={styles.status}>{user.status}</div>
        <div className={styles.addInfo}>
          <div>
            <GenderIcon /> {getGender(user)}
          </div>
          <div className={styles.date}>
            <BirthdayIcon />
            {day}.{month}.{year}
          </div>
          <div className={styles.city}>
            <CityIcon /> {user.city ? user.city : `Не указан`}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Item
