import ChatItem from "./ChatItem/ChatItem"

import CrossIcon from "@/components/ui/Icons/CrossIcon"
import SearchIcon from "@/components/ui/Icons/Messanger/SearchIcon"

import { useChat } from "@/hooks/useChat/useChat"

import styles from "./Messanger.module.scss"

const Messanger = () => {
  const { chats } = useChat()

  return (
    <div className={styles.messangerWrapper}>
      <div className={styles.messanger}>
        <div className={styles.header}>
          <SearchIcon />
          <input type="text" placeholder="Поиск" />
          <CrossIcon />
        </div>
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
