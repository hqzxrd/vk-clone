import { IMessage } from "@/types/messages.types"
import {
  Dispatch,
  FC,
  KeyboardEvent,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react"

import CrossIcon from "@/components/ui/Icons/CrossIcon"
import CamIcon from "@/components/ui/Icons/Post/CamIcon"
import SendIcon from "@/components/ui/Icons/Send"
import Textarea from "@/components/ui/Textarea/Textarea"

import styles from "./SendMessage.module.scss"

interface props {
  send: (text: string) => void
  update: (id: number, text: string) => void
  messagesBlock: RefObject<HTMLDivElement>
  activeUpdate: number
  setActiveUpdate: Dispatch<SetStateAction<number>>
  setActiveMessage: Dispatch<SetStateAction<number>>
  message: IMessage
}

const SendMessage: FC<props> = ({
  send,
  update,
  messagesBlock,
  activeUpdate,
  setActiveUpdate,
  setActiveMessage,
  message,
}) => {
  const [text, setText] = useState<string>(``)
  const [updateText, setUpdateText] = useState<string>(``)
  const sendBlockRef = useRef<HTMLDivElement>(null)
  const messagesBaseHeight = useRef<number>(0)

  const pressEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === `Enter` && e.shiftKey == false) {
      e.preventDefault()

      if (activeUpdate) {
        update(activeUpdate, updateText)
        setActiveUpdate(0)
        setActiveMessage(0)
        setUpdateText(``)
        return
      }

      send(text)
      setText(``)
    }
  }

  useEffect(() => {
    if (message) setUpdateText(message.text)
  }, [activeUpdate])

  useEffect(() => {
    if (!sendBlockRef.current || !messagesBlock.current) return

    const msh = messagesBlock.current.clientHeight
    const sbh = sendBlockRef.current.clientHeight
    const sendBaseHeight = 52
    const offset = sbh - sendBaseHeight

    messagesBlock.current.style.marginBottom = `${offset + 15}px`

    if (messagesBaseHeight.current === 0) {
      messagesBaseHeight.current = msh
    }

    if (messagesBaseHeight.current === 0) {
      return
    }

    messagesBlock.current.style.height = `${
      messagesBaseHeight.current - offset
    }px`
  }, [text, updateText, activeUpdate])

  return (
    <div className={styles.sendMessage} ref={sendBlockRef}>
      {activeUpdate !== 0 ? (
        <div className={styles.updateMessage}>
          <div>Редактирование сообщения</div>
          <div className={styles.cross} onClick={() => setActiveUpdate(0)}>
            <CrossIcon />
          </div>
        </div>
      ) : null}

      <div className={styles.main}>
        <Textarea
          style={{ maxHeight: 150, width: `100%` }}
          text={activeUpdate ? updateText : text}
          setText={activeUpdate ? setUpdateText : setText}
          resize={true}
          focus={true}
          onKeyDown={(e) => pressEnter(e)}
          maxLength={3000}
        />

        <div className={styles.sendIcon}>
          <SendIcon
            onClick={() => {
              if (activeUpdate) {
                update(activeUpdate, updateText)
                setActiveUpdate(0)
                setActiveMessage(0)
                setUpdateText(``)
                return
              }
              send(text)
              setText(``)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default SendMessage
