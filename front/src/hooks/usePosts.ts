import { PostService } from "@/services/post/post.service"
import { IPost } from "@/types/post.types"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"

export const usePosts = () => {
  const { userId } = useParams()

  const startPage = 2
  const count = 5
  const [posts, setPosts] = useState<[IPost[], number]>([[], 0])
  const [limitPage, setLimitPage] = useState<number>(0)
  const [page, setPage] = useState<number>(startPage)
  const [getNewData, setGetNewData] = useState<boolean>(false)

  useQuery(
    [`userPosts`, userId],
    () => PostService.getAll(`?user=${userId}&count=${count}`),
    {
      select: ({ data }) => data,
      onSuccess: (data) => {
        setLimitPage(Math.ceil(data[1] / count))
        setPosts(data)
        setPage(startPage)
      },
      onSettled: () => setGetNewData(false),
    }
  )

  useQuery(
    [`userPostsPagination`, userId],
    () =>
      PostService.getAll(`?user=${userId}&count=${count}` + `&page=${page}`),
    {
      select: ({ data }) => data,
      enabled: getNewData && !(page > limitPage),
      onSuccess: (data) => {
        setPosts((prev) => [[...prev[0], ...data[0]], data[1]])
        setPage((prev) => prev + 1)
      },
      onSettled: () => setGetNewData(false),
    }
  )

  const nextPage = () => {
    setGetNewData(true)
  }
  return { posts, nextPage }
}
