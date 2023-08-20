import { IUserChatsInfo } from "@/types/messages.types"
import { FC } from "react"

import AvatarMini from "@/components/ui/AvatarMini/AvatarMini"

import styles from "./Header.module.scss"
import { NavLink } from "react-router-dom"
import { userLink } from "@/utils/user-link"

interface props {
  withUser: IUserChatsInfo
}

const Header: FC<props> = ({ withUser }) => {
  return (
    <div className={styles.header}>
      <NavLink className={styles.linkBack} to={`/messanger`}>
        Назад
      </NavLink>

      <NavLink to={`/${userLink(withUser)}`}>
        {withUser.name} {withUser.surname}
      </NavLink>

      <AvatarMini user={withUser} width={25} height={25} isLink={true} />
    </div>
  )
}

export default Header
