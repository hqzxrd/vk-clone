import Header from "./Header/Header"
import HeaderOptions from "./HeaderOptions/HeaderOptions"
import SendMessage from "./SendMessage/SendMessage"
import { IMessage } from "@/types/messages.types"

import { useEffect, useRef, useState } from "react"

import { useAuth } from "@/hooks/useAuth"
import { useChat } from "@/hooks/useChat/useChat"

import styles from "./UserDialog.module.scss"
import MessageWrapper from "./MessageWrapper/MessageWrapper"

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
    getMessages,
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

  const onScroll = (e: Event) => {
    const target = e.target as HTMLElement
    if (
      Math.abs(target.scrollTop) + target.getBoundingClientRect().height ===
      target.scrollHeight
    ) {
      getMessages()
    }
  }

  useEffect(() => {
    if (!messagesBlockRef.current) return

    messagesBlockRef.current.addEventListener(`scroll`, onScroll)

    return () => {
      if (!messagesBlockRef.current) return
      messagesBlockRef.current.removeEventListener(`scroll`, onScroll)
    }
  }, [withUser])

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
          <MessageWrapper
            messages={messages}
            activeMessage={activeMessage}
            change={changeMessageClickStatus}
          />
        </div>
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
  )
}

export default UserDialog
