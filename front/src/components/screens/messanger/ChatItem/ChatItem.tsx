import { IChatItem } from "@/types/messages.types"
import { FC } from "react"

import AvatarMini from "@/components/ui/AvatarMini/AvatarMini"

import { useAuth } from "@/hooks/useAuth"

import { date } from "@/utils/date"

import styles from "./Chatitem.module.scss"
import { useNavigate } from "react-router-dom"
import { stringLimiter } from "@/utils/charLimiter"
import { userLink } from "@/utils/user-link"
import { useCheckMobile } from "@/hooks/useCheckMobile"
import ReadMark from "@/components/ui/Icons/Messanger/ReadMark"
import SendMark from "@/components/ui/Icons/Messanger/SendMark"
import { CheckmarkIcon } from "react-hot-toast"

interface props {
  chat: IChatItem
}

const ChatItem: FC<props> = ({ chat }) => {
  const isMobile = useCheckMobile()
  const nav = useNavigate()
  const { user } = useAuth()

  const { fullDateWithoutYear } = date(
    chat.message ? chat.message.createDate : chat.createDate
  )

  const [withUser] = chat.users.filter((u) => u.id !== user.id)

  const returnCountNoRead = () => {
    if (chat.message.author.id === user.id || chat.countNoRead === 0) return ``

    return <div className={styles.count}>{chat.countNoRead}</div>
  }

  const returnStatusMessage = () => {
    if (chat.message.author.id !== user.id) return ``

    const isRead = chat.message.statuses[0].isRead

    if (isRead === true) return <ReadMark />

    if (isRead === false) return <SendMark />
  }

  return (
    <div
      className={styles.chatItem}
      onClick={() => nav(`/chat/${userLink(withUser)}`)}
    >
      <div>
        <AvatarMini
          user={withUser}
          width={isMobile ? 40 : 50}
          height={isMobile ? 40 : 50}
          isLink={false}
        />
      </div>
      <div className={styles.chatInfo}>
        <div className={styles.upperBlock}>
          <div className={styles.name}>
            {withUser.name} {withUser.surname}
            <div className={styles.checkMark}>
              {withUser.checkMark && (
                <CheckmarkIcon className={styles.checkMarkIcon} />
              )}
            </div>
          </div>
          <div className={styles.lastTime}>{fullDateWithoutYear}</div>
        </div>
        <div className={styles.lastMessage}>
          {chat.message ? (
            <>
              <AvatarMini
                user={chat.message.author}
                width={20}
                height={20}
                isLink={false}
              />
              {stringLimiter(chat.message.text, 45)} {returnStatusMessage()}
              {returnCountNoRead()}
            </>
          ) : (
            <div className={styles.epmty}>Сообщений нет</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatItem
