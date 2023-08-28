import { NotificationService } from "@/services/notification/notification.service"
import cn from "classnames"
import React, { FC, useState } from "react"
import { useDispatch } from "react-redux"

import Notification from "@/components/screens/notification/Notification"
import { INotificationDto } from "@/components/screens/notification/Notification.interface"
import AvatarMini from "@/components/ui/AvatarMini/AvatarMini"
import ArrowDownIcon from "@/components/ui/Icons/Header/ArrowDownIcon"
import LeaveIcon from "@/components/ui/Icons/Header/LeaveIcon"
import NotificIcon from "@/components/ui/Icons/Header/NotificIcon"
import ThemeIcon from "@/components/ui/Icons/Header/ThemeIcon"

import { useActions } from "@/hooks/useActions"
import { useAuth } from "@/hooks/useAuth"
import { useTypedSelector } from "@/hooks/useTypedSelector"

import { setNotifCount } from "@/store/user/user.slice"

import styles from "./Header.module.scss"
import { NavLink } from "react-router-dom"
import DropDownWrap from "@/components/wrappers/DropDownWrap/DropDownWrap"
import ProfileIcon from "@/components/ui/Icons/LeftSideMenu/ProfileIcon"
import { useCheckMobile } from "@/hooks/useCheckMobile"
import { userLink } from "@/utils/user-link"
import NewsIcon from "@/components/ui/Icons/LeftSideMenu/NewsIcon"
import MessangerIcon from "@/components/ui/Icons/LeftSideMenu/MessangerIcon"
import FriendsIcon from "@/components/ui/Icons/LeftSideMenu/FriendsIcon"
import PeoplesIcon from "@/components/ui/Icons/LeftSideMenu/PeoplesIcon"

const AuthHeader: FC = () => {
  const { user, isAuth } = useAuth()
  const { theme } = useTypedSelector((st) => st.theme)
  const { notifications: notif } = useTypedSelector((st) => st.user)
  const [isOpenNotification, setIsOpenNotification] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [notifications, setNotifications] = useState<INotificationDto[]>([])
  const { logout, changeTheme } = useActions()
  const isMobile = useCheckMobile(1000)
  const dispatch = useDispatch()

  const handleClick = async () => {
    setIsOpenNotification(!isOpenNotification)
    if (!isOpenNotification) {
      const res = await NotificationService.getAllNotifications()
      if (res) setNotifications(res.data[0])
      dispatch(
        setNotifCount({ notificationCount: 0, notificationIncomingCount: 0 })
      )
    }
  }

  if (!isAuth) {
    return <></>
  }

  return (
    <>
      <div>
        <button
          className={
            isOpenNotification
              ? cn(styles.notification, styles.activeHeaderElem)
              : cn(styles.notification, styles.headerHover)
          }
          onClick={() => handleClick()}
        >
          {notif.notificationCount !== 0 && (
            <div className={styles.notifCount}>{notif.notificationCount}</div>
          )}

          <NotificIcon />
        </button>

        <DropDownWrap
          isOpen={isOpenNotification}
          setIsOpen={setIsOpenNotification}
        >
          {notifications.length ? (
            notifications.map((notif) => {
              return <Notification notif={notif} key={notif.id} />
            })
          ) : (
            <>Уведомлений нет</>
          )}
        </DropDownWrap>
      </div>

      <div className={styles.lastMenu}>
        <button
          className={
            isOpen
              ? cn(styles.notification, styles.activeHeaderElem)
              : cn(styles.notification, styles.headerHover)
          }
          onClick={() => setIsOpen(!isOpen)}
        >
          <AvatarMini user={user} width={22} height={22} isLink={false} />
          <ArrowDownIcon />
        </button>

        <DropDownWrap
          className={styles.lastMenuDropDown}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        >
          {isMobile && (
            <>
              <NavLink to={`/${userLink(user)}`}>
                <div>
                  <ProfileIcon />
                </div>
                <div>Моя страница</div>
              </NavLink>

              <NavLink to={`/`}>
                <div>
                  <NewsIcon />
                </div>
                <div>Лента</div>
              </NavLink>

              <NavLink to={`/messanger`}>
                <div>
                  <MessangerIcon />
                </div>
                <div>Мессенджер</div>
              </NavLink>

              <NavLink to={`/friends`}>
                <div>
                  <FriendsIcon />
                </div>
                <div>Друзья</div>
              </NavLink>

              <NavLink to={`/peoples`}>
                <div>
                  <PeoplesIcon />
                </div>
                <div>Люди</div>
              </NavLink>
              <hr />
            </>
          )}

          <button onClick={() => changeTheme()}>
            <ThemeIcon /> Тема:{" "}
            <span>{theme === `dark` ? "Тёмная" : "Светлая"}</span>
          </button>

          <NavLink
            className={styles.leave}
            to={`/login`}
            onClick={() => logout()}
          >
            <div>
              <LeaveIcon />
            </div>
            <div>Выйти</div>
          </NavLink>
        </DropDownWrap>
      </div>
    </>
  )
}

export default AuthHeader
