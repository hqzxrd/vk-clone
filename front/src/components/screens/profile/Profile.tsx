import CreatePost from "./CreatePost/CreatePost"
import Info from "./Info/Info"
import Post from "./Post/Post"
import { IPost } from "@/types/post.types"

import { useAuth } from "@/hooks/useAuth"
import { usePosts } from "@/hooks/usePosts"
import { useProfile } from "@/hooks/useProfile"

import styles from "./Profile.module.scss"
import { useParams } from "react-router-dom"
import { useEffect } from "react"

const Profile = () => {
  const { user } = useAuth()
  const { profile } = useProfile()
  const { userId } = useParams()
  const { posts, nextPage } = usePosts()

  const onScroll = (e: Event) => {
    const target = e.target as HTMLElement
    if (target.scrollHeight - (target.scrollTop + window.innerHeight) < 100) {
      nextPage()
    }
  }

  useEffect(() => {
    document.body.addEventListener(`scroll`, onScroll)

    return () => {
      document.body.removeEventListener(`scroll`, onScroll)
    }
  }, [])

  if (!profile || !posts[0]) {
    return null
  }

  return (
    <div className={styles.wrapper}>
      <Info />
      {isNaN(+userId!)
        ? user.nickname === userId && <CreatePost />
        : user.id === +userId! && <CreatePost />}

      {posts[0].map((post: IPost) => {
        return <Post post={post} key={post.id} />
      })}

      {!posts[1] && user.id === profile.id ? (
        <div className={styles.noPosts}>У вас нет еще ни одной записи</div>
      ) : null}

      {!posts[1] && user.id !== profile.id ? (
        <div className={styles.noPosts}>
          У {profile.name} на стене пока нет ни одной записи
        </div>
      ) : null}
    </div>
  )
}

export default Profile
