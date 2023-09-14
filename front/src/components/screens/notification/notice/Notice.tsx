import React, { useEffect, useState } from "react"
import { INotificationDto } from "../Notification.interface"
import { useDispatch } from "react-redux"
import { NotificationService } from "@/services/notification/notification.service"
import { setNotifCount } from "@/store/user/user.slice"
import Notification from "../Notification"

import styles from "./Notice.module.scss"

const Notice = () => {
  const [notifications, setNotifications] = useState<INotificationDto[]>([])
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchNotification = async () => {
      const res = await NotificationService.getAllNotifications()
      if (res) setNotifications(res.data[0])
      dispatch(
        setNotifCount({ notificationCount: 0, notificationIncomingCount: 0 })
      )
    }

    fetchNotification()
  }, [])

  return (
    <div className={styles.notice}>
      <div className={styles.head}>Уведомления</div>
      {notifications.length ? (
        notifications.map((notif) => {
          return (
            <>
              <Notification notif={notif} key={notif.id} />
              <hr />
            </>
          )
        })
      ) : (
        <>Уведомлений нет</>
      )}
    </div>
  )
}

export default Notice
