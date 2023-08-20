import { IMessage } from "@/types/messages.types"
import cn from "classnames"
import { FC, HTMLAttributes } from "react"

import PencilIcon from "@/components/ui/Icons/PencilIcon"

import { useAuth } from "@/hooks/useAuth"

import { date } from "@/utils/date"

import styles from "./Message.module.scss"

interface props extends HTMLAttributes<HTMLDivElement> {
  message: IMessage
  activeMessage: number
}

const Message: FC<props> = ({ message, activeMessage, ...rest }) => {
  const { user } = useAuth()
  const { time } = date(message.createDate)

  const isUserSend = user.id === message.author.id

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
        <div className={styles.dateWrapper}>
          <div className={styles.date}>{time}</div>
        </div>
      </div>
    </div>
  )
}

export default Message
