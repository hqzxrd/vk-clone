import { IMessage } from "@/types/messages.types"
import cn from "classnames"
import { FC, HTMLAttributes, useEffect } from "react"

import PencilIcon from "@/components/ui/Icons/PencilIcon"

import { useAuth } from "@/hooks/useAuth"

import { check, date } from "@/utils/date"

import styles from "./Message.module.scss"
import SendMark from "@/components/ui/Icons/Messanger/SendMark"
import ReadMark from "@/components/ui/Icons/Messanger/ReadMark"

interface props extends HTMLAttributes<HTMLDivElement> {
  message: IMessage
  activeMessage: number
}

const Message: FC<props> = ({ message, activeMessage, ...rest }) => {
  const { user } = useAuth()
  const { time } = date(message.createDate)

  const isUserSend = user.id === message.author.id
  const isRead = message.statuses[0].isRead

  const returnStatusMessage = () => {
    if (!isUserSend) return ``

    if (isUserSend && isRead === true) return <ReadMark />

    if (isUserSend && isRead === false) return <SendMark />
  }

  return (
    <div
      {...rest}
      className={
        message.id === activeMessage
          ? cn(styles.messageWrapper, styles.active)
          : styles.messageWrapper
      }
    >
      <div
        className={
          isUserSend
            ? cn(styles.message, styles.userSend)
            : cn(styles.message, styles.userGet)
        }
      >
        {message.text}
        <div className={styles.messageMeta}>
          <div className={styles.isChanged}>
            {message.isChanged ? `(ред.)` : null}
          </div>
          <div className={styles.date}>{time}</div>
          <div className={styles.status}>{returnStatusMessage()}</div>
        </div>
      </div>
    </div>
  )
}

export default Message
