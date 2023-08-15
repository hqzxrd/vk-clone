import Comment from "./Comment/Comment"
import { PostService } from "@/services/post/post.service"
import { IComment, IPost } from "@/types/post.types"
import { FC, KeyboardEvent, useState, useEffect } from "react"
import { useQueryClient } from "react-query"

import AvatarMini from "@/components/ui/AvatarMini/AvatarMini"
import SendIcon from "@/components/ui/Icons/Send"
import Textarea from "@/components/ui/Textarea/Textarea"

import { useAuth } from "@/hooks/useAuth"
import { useComments } from "@/hooks/useComments"

import styles from "./Comments.module.scss"

interface props {
  post: IPost
}

const Comments: FC<props> = ({ post }) => {
  const [text, setText] = useState<string>(``)
  const { user } = useAuth()
  const { comments, count, setCount } = useComments(post.id)
  const queryClient = useQueryClient()

  const pressEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === `Enter` && e.shiftKey == false) {
      e.preventDefault()
      sendComment()
    }
  }
  console.log(comments)

  const sendComment = async () => {
    if (!text) return

    const res = await PostService.createComment(post.id, text)

    if (res?.status === 201) {
      queryClient.invalidateQueries([`postComments`, post.id])
      setText(``)
    }
  }

  if (!comments) return <></>

  return (
    <div className={styles.comments}>
      {comments[0].map((comment: IComment) => {
        return <Comment post={post} comment={comment} key={comment.id} />
      })}

      {count >= comments[1] ? null : (
        <div className={styles.showMore}>
          <div onClick={() => setCount((prev) => prev + 10)}>
            Показать еще {comments[1] - count > 10 ? `10` : comments[1] - count}
          </div>

          <div onClick={() => setCount((prev) => prev + comments[1])}>
            Показать все
          </div>
        </div>
      )}

      <div className={styles.create_comment}>
        <AvatarMini user={user} width={24} height={24} isLink={false} />

        <div className={styles.textarea_wrapper}>
          <Textarea
            text={text}
            setText={setText}
            resize={true}
            placeholder="Написать комментарий..."
            onKeyDown={(e) => pressEnter(e)}
          />
        </div>
        <div className={styles.send}>
          <SendIcon onClick={() => sendComment()} />
        </div>
      </div>
    </div>
  )
}

export default Comments
