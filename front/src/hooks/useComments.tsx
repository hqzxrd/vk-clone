import { PostService } from "@/services/post/post.service"
import { IComment } from "@/types/post.types"
import { useState } from "react"
import { useQuery } from "react-query"

export const useComments = (postId: number, enabled?: boolean) => {
  const [comments, setComments] = useState<[IComment[], number] | null>(null)
  const [count, setCount] = useState<number>(10)

  const { isLoading } = useQuery(
    [`postComments`, postId, count],
    () =>
      PostService.getCommentsByPostId(
        `?post=${postId}` + (count > 10 ? `&count=${count}` : ``)
      ),
    {
      select: ({ data }) => data,
      enabled: !enabled,
      onSuccess: (data) => setComments(data),
    }
  )

  return { isLoading, comments, count, setCount }
}
