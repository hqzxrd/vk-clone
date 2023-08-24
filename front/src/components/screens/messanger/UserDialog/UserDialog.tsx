import Header from "./Header/Header"
import HeaderOptions from "./HeaderOptions/HeaderOptions"
import Message from "./Message/Message"
import SendMessage from "./SendMessage/SendMessage"
import { IMessage } from "@/types/messages.types"

import { useEffect, useRef, useState } from "react"

import { useAuth } from "@/hooks/useAuth"
import { useChat } from "@/hooks/useChat"

import styles from "./UserDialog.module.scss"
import { compareTwoStringDate, date } from "@/utils/date"

const UserDialog = () => {
  const { user } = useAuth()
  const {
    chatInfo,
    messages,
    sendMessage,
    updateMessage,
    deleteMessage,
    getMessageById,
    readMessage,
  } = useChat()
  const [activeMessage, setActiveMessage] = useState<number>(0)
  const [activeUpdate, setActiveUpdate] = useState<number>(0)
  const messagesBlockRef = useRef<HTMLDivElement>(null)

  const withUser = chatInfo
    ? chatInfo.users.filter((u) => u.id !== user.id)
    : null

  const changeMessageClickStatus = (message: IMessage) => {
    if (user.id !== message.author.id || activeUpdate !== 0) {
      return
    }

    if (activeMessage === 0 || activeMessage !== message.id) {
      setActiveMessage(message.id)
    } else {
      setActiveMessage(0)
    }
  }

  useEffect(() => {
    if (!messages || !messages[0]) return

    if (messages[0].statuses[0].isRead) return

    readMessage(messages[0].id)
  }, [])

  useEffect(() => {
    if (!messages || !messages[0]) return

    if (messages[0].statuses[0].isRead) return
    readMessage(messages[0].id)
  }, [messages])

  if (!withUser || !withUser[0] || !messages) {
    return <></>
  }

  return (
    <div className={styles.dialogWrapper}>
      <div className={styles.dialogWindow}>
        {activeMessage === 0 ? (
          <Header withUser={withUser[0]} />
        ) : (
          <HeaderOptions
            activeMessage={activeMessage}
            setActiveMessage={setActiveMessage}
            activeUpdate={activeUpdate}
            setActiveUpdate={setActiveUpdate}
            deleteMessage={deleteMessage}
          />
        )}
        <div className={styles.messages} ref={messagesBlockRef}>
          {messages.map((mes, i) => {
            const currentMesDate = mes.createDate
            const nextMesDate = messages[i + 1]
              ? messages[i + 1].createDate
              : ``
            const { diffHours, diffDays } = compareTwoStringDate(
              currentMesDate,
              nextMesDate
            )

            const { dayAndMonth } = date(currentMesDate)

            return (
              <>
                <Message
                  onClick={() => changeMessageClickStatus(mes)}
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
        </div>
        <SendMessage
          activeUpdate={activeUpdate}
          setActiveUpdate={setActiveUpdate}
          setActiveMessage={setActiveMessage}
          messagesBlock={messagesBlockRef}
          send={sendMessage}
          update={updateMessage}
          message={getMessageById(activeUpdate)}
        />
      </div>
    </div>
  )
}

export default UserDialog
