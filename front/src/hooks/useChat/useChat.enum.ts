export enum ChatEvent {
  CONNECT = `connect`,
  CONNECT_ERROR = `connect_error`,
  DISCONNECT = `disconnect`,

  EMIT_GET_CHATS = `get all chat event`,
  EMIT_GET_CHAT_INFO = `find chat by user key event`,
  EMIT_GET_CHAT_MESSAGES = `get messages chat event`,

  EMIT_READ_MESSAGE = `read message event`,
  EMIT_SEND_MESSAGE = `private chat event`,
  EMIT_DELETE_MESSAGE = `delete message event`,
  EMIT_UPDATE_MESSAGE = `update message event`,

  ON_GET_MESSAGE = `receive message event`,
  ON_GET_READ_MESSAGE = `receive read message event`,
  ON_GET_DELETE_MESSAGE = `receive delete message event`,
  ON_GET_UPDATE_MESSAGE = `receive update message event`,
}
