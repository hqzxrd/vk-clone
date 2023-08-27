import { FriendService } from "@/services/friends/friends.service"
import { IUser } from "@/types/user.types"
import { FC } from "react"
import { QueryClient, useQueryClient } from "react-query"

import AvatarMini from "@/components/ui/AvatarMini/AvatarMini"

import { userLink } from "@/utils/user-link"

import styles from "./Item.module.scss"
import { NavLink } from "react-router-dom"
import { CheckmarkIcon } from "react-hot-toast"
import UserLinkIcon from "@/components/ui/Icons/Profile/UserLinkIcon"
import { useCheckMobile } from "@/hooks/useCheckMobile"

interface IButtons {
  [index: number]: (user: IUser, qClient: QueryClient) => JSX.Element
}

const buttons: IButtons = {
  0: (user, qClient) => (
    <div
      className={styles.addOrDelete}
      onClick={async () => {
        const res = await FriendService.removeFriend(user.id)
        if (res?.status === 204) qClient.invalidateQueries(`get_friends`)
      }}
    >
      Удалить из друзей
    </div>
  ),
  2: (user, qClient) => (
    <div
      className={styles.addOrDelete}
      onClick={async () => {
        const res = await FriendService.cancelRequest(user.id)
        if (res?.status === 204) qClient.invalidateQueries(`get_outgoing`)
      }}
    >
      Отменить
    </div>
  ),
  1: (user, qClient) => (
    <>
      <div
        className={styles.addOrDelete}
        onClick={async () => {
          const res = await FriendService.resOnFriendRequest(user.id, true)
          if (res?.status === 204) qClient.invalidateQueries(`get_incoming`)
        }}
      >
        Принять
      </div>
      <div
        className={styles.addOrDelete}
        onClick={async () => {
          const res = await FriendService.resOnFriendRequest(user.id, false)
          if (res?.status === 204) qClient.invalidateQueries(`get_incoming`)
        }}
      >
        Отказать
      </div>
    </>
  ),
}

const Item: FC<{ user: IUser; state: number }> = ({ user, state }) => {
  const isMobile = useCheckMobile()
  const queryClient = useQueryClient()

  return (
    <div className={styles.peoples_item}>
      <AvatarMini
        user={user}
        width={!isMobile ? 90 : 50}
        height={!isMobile ? 90 : 50}
        isLink={true}
      />
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
        <div className={styles.actions}>
          {buttons[state](user, queryClient)}
        </div>
      </div>
    </div>
  )
}

export default Item
