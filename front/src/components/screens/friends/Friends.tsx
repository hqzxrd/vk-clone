import NotificationBadge from "./NotificationBadge"
import Item from "./item/Item"
import { UserService } from "@/services/user/user.service"
import { IUser } from "@/types/user.types"
import cn from "classnames"
import { useEffect, useState } from "react"
import { useQuery, useQueryClient } from "react-query"

import { useAuth } from "@/hooks/useAuth"

import styles from "./Friends.module.scss"

const tabs = [
  <div>Все друзья</div>,
  <div className={styles.tab}>
    Входящие <NotificationBadge />
  </div>,
  <div>Исходящие</div>,
]

const Friends = () => {
  const [activeTab, setActiveTab] = useState<number>(0)
  const { user } = useAuth()
  const { data: friends } = useQuery(
    `get_friends`,
    () => UserService.getFriends(user.id),
    {
      select: ({ data }) => data,
      enabled: activeTab === 0,
    }
  )

  const { data: incoming } = useQuery(
    `get_incoming`,
    () => UserService.getRequest(`incoming`),
    {
      select: ({ data }) => data,
      enabled: activeTab === 1,
    }
  )

  const { data: outgoing } = useQuery(
    `get_outgoing`,
    () => UserService.getRequest(`outgoing`),
    {
      select: ({ data }) => data,
      enabled: activeTab === 2,
    }
  )

  return (
    <div className={styles.friends_wrapper}>
      <div className={styles.friends}>
        <div className={styles.tabs}>
          {tabs.map((tab, i) => {
            return (
              <div
                className={
                  activeTab === i
                    ? cn(styles.tabItem, styles.tabItem_active)
                    : styles.tabItem
                }
                onClick={() => setActiveTab(i)}
                key={i}
              >
                {tab}
              </div>
            )
          })}
        </div>
        <div>
          {friends && activeTab === 0 ? (
            <div>
              {friends[0].map((user) => {
                return <Item user={user} key={user.id} state={activeTab} />
              })}
            </div>
          ) : null}

          {incoming && activeTab === 1 ? (
            <div>
              {incoming[0].map((user) => {
                return <Item user={user} key={user.id} state={activeTab} />
              })}
            </div>
          ) : null}

          {outgoing && activeTab === 2 ? (
            <div>
              {outgoing[0].map((user) => {
                return <Item user={user} key={user.id} state={activeTab} />
              })}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Friends
