import { AuthService } from "@/services/auth/auth.service"
import { IChatByUserId, IChatItem, IMessage } from "@/types/messages.types"
import { useEffect, useState } from "react"
import { io } from "socket.io-client"

import { WS_URL } from "@/config/api.config"
import { useParams } from "react-router-dom"
import { returnStringOrNubmer } from "@/utils/user-link"

export const socket = io(WS_URL, {
  auth: { token: `` },
  autoConnect: false,
})

export const useChat = () => {
  const [chats, setChats] = useState<IChatItem[]>([])
  const [chatInfo, setChatInfo] = useState<IChatByUserId>()
  const [messages, setMessages] = useState<IMessage[]>([])
  const { userId } = useParams()
  const count = 50

  const sendMessage = (text: string) => {
    socket.emit(
      "private chat event",
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
    socket.emit(
      "update message event",
      {
        id,
        text,
      },
      () => {
        socket.emit(
          "get messages chat event",
          { userKey: userId!, count },
          (mes: [IMessage[], number]) => {
            setMessages(mes[0])
          }
        )
      }
    )
  }

  const deleteMessage = (id: number) => {
    socket.emit("delete message event", {
      id,
    })
    setMessages((prev) => prev.filter((message) => message.id !== id))
  }

  const readMessage = (id: number) => {
    socket.emit("read message event", { id })
  }

  useEffect(() => {
    socket.connect()

    socket.on("connect", () => {
      console.log(`connected`)
    })

    socket.on("connect_error", async (err) => {
      if (err.message === `Unauthorized`) {
        const res = await AuthService.getNewsTokens()

        if (res.data.accessToken) socket.auth.token = res.data.accessToken
      }
      setTimeout(() => {
        socket.connect()
      }, 1000)
    })

    socket.on("disconnect", () => {
      console.log(`disconnected`)
    })

    socket.emit(
      "get all chat event",
      { id: returnStringOrNubmer(userId!) },
      (mes: [IChatItem[], number]) => {
        setChats(mes[0])
      }
    )

    socket.emit(
      "find chat by user key event",
      { userKey: returnStringOrNubmer(userId!) },
      (res: IChatByUserId) => {
        setChatInfo(res)
      }
    )

    socket.emit(
      "get messages chat event",
      { userKey: userId!, count },
      (mes: [IMessage[], number]) => {
        console.log(mes)
        setMessages(mes[0])
      }
    )

    socket.on("receive message event", () => {
      socket.emit(
        "get all chat event",
        { id: userId! },
        (mes: [IChatItem[], number]) => {
          setChats(mes[0])
        }
      )
    })

    socket.on("receive read message event", (data) => {
      setMessages((prev) => {
        return prev.map((item) => {
          const statuses = [{ isRead: true }]
          return item.statuses[0].isRead ? item : { ...item, statuses }
        })
      })
    })

    socket.on("receive delete message event", (mes: IMessage) => {
      setMessages((prev) => prev.filter((message) => message.id !== mes.id))

      socket.emit(
        "get all chat event",
        { id: userId! },
        (mes: [IChatItem[], number]) => {
          setChats(mes[0])
        }
      )
    })

    return () => {
      socket.off("connect")
      socket.off("connect_error")
      socket.off("disconnect")
      socket.off(`receive message event`)
      socket.off(`receive delete message event`)
      socket.off(`receive read message event`)
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    socket.on("receive message event", (mes: IMessage) => {
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
  }
}
