import { FC } from "react"
import styles from "./MessageWrapper.module.scss"
import { IMessage } from "@/types/messages.types"
import { compareTwoStringDate, date } from "@/utils/date"
import Message from "../Message/Message"

interface props {
  messages: IMessage[]
  activeMessage: number
  change: (message: IMessage) => void
}

const MessageWrapper: FC<props> = ({ messages, activeMessage, change }) => {
  return (
    <>
      {messages.map((mes, i) => {
        const currentMesDate = mes.createDate
        const nextMesDate = messages[i + 1] ? messages[i + 1].createDate : ``
        const { diffHours, diffDays } = compareTwoStringDate(
          currentMesDate,
          nextMesDate
        )

        const { dayAndMonth } = date(currentMesDate)

        return (
          <>
            <Message
              onClick={() => change(mes)}
              activeMessage={activeMessage}
              message={mes}
              key={mes.id}
            />
            {diffDays >= 1 || i === messages.length - 1 ? (
              <div className={styles.space}>{dayAndMonth}</div>
            ) : diffHours >= 1 && !mes.statuses[0].isRead ? (
              <div className={styles.space2} />
            ) : null}
          </>
        )
      })}
    </>
  )
}

export default MessageWrapper
