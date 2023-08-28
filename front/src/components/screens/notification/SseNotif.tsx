import userToast from "../../ui/CustomToast/UserToast"
import { ICountNotifSSE, INotificationSSE } from "./Notification.interface"
import Cookies from "js-cookie"
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"

import { notificationUrl } from "@/config/api.config"

import { setNotifCount } from "@/store/user/user.slice"
import { useActions } from "@/hooks/useActions"
import { useTypedSelector } from "@/hooks/useTypedSelector"

const SseNotif = () => {
  const dispatch = useDispatch()
  const { isAuth } = useTypedSelector((state) => state.user)

  const hanleMessage = (e: MessageEvent<any>) => {
    const message: INotificationSSE = JSON.parse(e.data)
    console.log(`hendle`, message)
    dispatch(
      setNotifCount({
        notificationCount: message.count,
        notificationIncomingCount: message.countRequestFriendNotification,
      })
    )

    if (message)
      if (message.type === "friend_request") {
        userToast(message, `Подал заявку в друзья`)
      }

    if (message.type === "access_request") {
      userToast(message, `Принял заявку в друзья`)
    }

    if (message.type === "comment") {
      userToast(message, `Прокомментировал вашу запись`)
    }

    if (message.type === "like_post") {
      userToast(message, `Лайкнул вашу запись`)
    }
  }

  useEffect(() => {
    const token = Cookies.get(`AccessToken`)

    if (!isAuth || !token) return

    const es = new window.EventSource(notificationUrl(`/sse?token=${token}`), {
      withCredentials: true,
    })

    es.addEventListener("message", hanleMessage)

    return () => es.removeEventListener("message", hanleMessage)
  }, [isAuth])
  return <></>
}

export default SseNotif
