import { FriendService } from "@/services/friends/friends.service"
import { Relationship } from "@/types/user.types"
import { useEffect, useState } from "react"
import { useQueryClient } from "react-query"

import MessageIcon from "@/components/ui/Icons/Profile/MessageIcon"

import { useAuth } from "@/hooks/useAuth"
import { useProfile } from "@/hooks/useProfile"

import { userLink } from "@/utils/user-link"

import styles from "./UserActions.module.scss"
import { NavLink, useNavigate, useParams } from "react-router-dom"

const UserActions = () => {
  const [stateRequestFriend, setStateRequestFriend] =
    useState<Relationship>("none")
  const { profile } = useProfile()
  const { user } = useAuth()
  const { userId } = useParams()
  const nav = useNavigate()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (profile) setStateRequestFriend(profile.typeRelationship)
  }, [profile])

  const sendRequest = async () => {
    const res = await FriendService.sendRequest(profile!.id)
    res?.status === 200 && queryClient.invalidateQueries([`profile`])
  }

  const cancelRequest = async () => {
    const res = await FriendService.cancelRequest(profile!.id)
    res?.status === 204 && queryClient.invalidateQueries([`profile`])
  }

  const resOnFriendRequest = async (bool: boolean) => {
    const res = await FriendService.resOnFriendRequest(profile!.id, bool)
    res?.status === 204 && queryClient.invalidateQueries([`profile`])
  }

  const removeFriend = async () => {
    const res = await FriendService.removeFriend(profile!.id)
    res?.status === 204 && queryClient.invalidateQueries([`profile`])
  }

  if (!profile) {
    return <></>
  }

  return (
    <div className={styles.actions}>
      {user.id === profile?.id ? (
        <div onClick={() => nav(`/edit`, { replace: true })}>
          Редактировать профиль
        </div>
      ) : (
        <>
          {stateRequestFriend === "none" && (
            <div onClick={() => sendRequest()}>Добавить в друзья</div>
          )}
          {stateRequestFriend === "outgoing" && (
            <div onClick={() => cancelRequest()}>Отменить заявку</div>
          )}
          {stateRequestFriend === "incoming" && (
            <>
              <div onClick={() => resOnFriendRequest(true)}>Принять</div>
              <div onClick={() => resOnFriendRequest(false)}>Отказать</div>
            </>
          )}
          {stateRequestFriend === "friend" && (
            <div onClick={() => removeFriend()}>Удалить из друзей</div>
          )}
          <NavLink to={`/chat/${userLink(profile)}`}>
            <MessageIcon />
          </NavLink>
        </>
      )}
    </div>
  )
}

export default UserActions
