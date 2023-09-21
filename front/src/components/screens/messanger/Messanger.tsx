import ChatItem from "./ChatItem/ChatItem"

import { useChat } from "@/hooks/useChat/useChat"

import styles from "./Messanger.module.scss"
import useTabTitle from "@/hooks/useTabTitle"

const Messanger = () => {
  const { chats } = useChat()
  useTabTitle(`Мессенджер`)
  return (
    <div className={styles.messangerWrapper}>
      <div className={styles.messanger}>
        <div className={styles.header}>Мессенджер</div>
        <div className={styles.allChats}>
          {chats[0] ? (
            chats.map((chat) => {
              return <ChatItem chat={chat} key={chat.id} />
            })
          ) : (
            <div className={styles.epmty}>Список чатов пуст</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Messanger
