import { AuthService } from "@/services/auth/auth.service"
import { IChatByUserId, IChatItem, IMessage } from "@/types/messages.types"
import { useEffect, useState } from "react"
import { io } from "socket.io-client"

import { WS_URL } from "@/config/api.config"
import { useParams } from "react-router-dom"
import { returnStringOrNubmer } from "@/utils/user-link"
import { ChatEvent } from "./useChat.enum"
import { isEpmtyString } from "@/shared/regex"

export const socket = io(WS_URL, {
  auth: { token: `` },
  autoConnect: false,
})

export const useChat = () => {
  const [chats, setChats] = useState<IChatItem[]>([])
  const [chatInfo, setChatInfo] = useState<IChatByUserId>()
  const [messages, setMessages] = useState<IMessage[]>([])
  const [page, setPage] = useState<number>(1)
  const { userId } = useParams()

  const sendMessage = (text: string) => {
    if (!isEpmtyString(text)) return
    socket.emit(
      ChatEvent.EMIT_SEND_MESSAGE,
      {
        toUserKey: userId!,
        text: text,
      },
      (message: IMessage) => {
        setMessages((messages) => [message, ...messages])
      }
    )
  }

  const getMessageById = (id: number): IMessage => {
    return messages.filter((message) => message.id === id)[0]
  }

  const updateMessage = (id: number, text: string) => {
    if (!text) return
    socket.emit(
      ChatEvent.EMIT_UPDATE_MESSAGE,
      {
        id,
        text,
      },
      (data: IMessage) => {
        setMessages((prev) =>
          prev.map((item) =>
            item.id === data.id
              ? { ...item, text: data.text, isChanged: true }
              : item
          )
        )
      }
    )
  }

  const deleteMessage = (id: number) => {
    socket.emit(ChatEvent.EMIT_DELETE_MESSAGE, {
      id,
    })
    setMessages((prev) => prev.filter((message) => message.id !== id))
  }

  const readMessage = (id: number) => {
    socket.emit(ChatEvent.EMIT_READ_MESSAGE, { id })
  }

  const getChats = () => {
    socket.emit(
      ChatEvent.EMIT_GET_CHATS,
      { id: userId! },
      (mes: [IChatItem[], number]) => {
        setChats(mes[0])
      }
    )
  }

  const getMessages = (count: number = 25) => {
    if (userId)
      socket.emit(
        ChatEvent.EMIT_GET_CHAT_MESSAGES,
        { userKey: userId, count, page },
        (mes: [IMessage[], number]) => {
          setMessages((prev) => [...prev, ...mes[0]])
          const lastPage = Math.ceil(mes[1] / count)
          if (page <= lastPage) setPage((prev) => prev + 1)
        }
      )
  }

  useEffect(() => {
    socket.connect()

    socket.on(ChatEvent.CONNECT, () => {
      console.log(`connected`)
    })

    socket.on(ChatEvent.CONNECT_ERROR, async (err) => {
      if (err.message === `Unauthorized`) {
        const res = await AuthService.getNewsTokens()

        if (res.data.accessToken) socket.auth.token = res.data.accessToken
      }
      setTimeout(() => {
        socket.connect()
      }, 1000)
    })

    socket.on(ChatEvent.DISCONNECT, () => {
      console.log(`disconnected`)
    })

    getChats()
    getMessages()

    if (userId)
      socket.emit(
        ChatEvent.EMIT_GET_CHAT_INFO,
        { userKey: returnStringOrNubmer(userId) },
        (res: IChatByUserId) => {
          setChatInfo(res)
        }
      )

    socket.on(ChatEvent.ON_GET_MESSAGE, (data) => {
      getChats()
    })

    socket.on(ChatEvent.ON_GET_READ_MESSAGE, () => {
      setMessages((prev) => {
        return prev.map((item) => {
          const statuses = [{ isRead: true }]
          return item.statuses[0].isRead ? item : { ...item, statuses }
        })
      })
    })

    socket.on(ChatEvent.ON_GET_UPDATE_MESSAGE, (mes: IMessage) => {
      setMessages((prev) =>
        prev.map((item) =>
          item.id === mes.id
            ? { ...item, text: mes.text, isChanged: true }
            : item
        )
      )

      getChats()
    })

    socket.on(ChatEvent.ON_GET_DELETE_MESSAGE, (mes: IMessage) => {
      setMessages((prev) => prev.filter((message) => message.id !== mes.id))

      getChats()
    })

    return () => {
      socket.off(ChatEvent.CONNECT)
      socket.off(ChatEvent.CONNECT_ERROR)
      socket.off(ChatEvent.DISCONNECT)
      socket.off(ChatEvent.ON_GET_MESSAGE)
      socket.off(ChatEvent.ON_GET_READ_MESSAGE)
      socket.off(ChatEvent.ON_GET_UPDATE_MESSAGE)
      socket.off(ChatEvent.ON_GET_DELETE_MESSAGE)

      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    socket.on(ChatEvent.ON_GET_MESSAGE, (mes: IMessage) => {
      if (mes.chat.id === chatInfo?.id)
        setMessages((messages) => [mes, ...messages])
    })
  }, [chatInfo])

  return {
    chats,
    chatInfo,
    messages,
    sendMessage,
    updateMessage,
    deleteMessage,
    getMessageById,
    readMessage,
    getMessages,
  }
}
