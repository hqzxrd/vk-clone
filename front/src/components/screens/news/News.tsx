import CreatePost from "../profile/CreatePost/CreatePost"
import Post from "../profile/Post/Post"
import { PostService } from "@/services/post/post.service"
import { IPost } from "@/types/post.types"
import React, { useEffect, useState } from "react"

import styles from "./News.module.scss"

const News = () => {
  const [posts, setPosts] = useState<IPost[]>([])

  const getNewsline = async () => {
    const res = await PostService.getNewsline("")
    setPosts(res.data[0])
  }

  useEffect(() => {
    getNewsline()
  }, [])

  return (
    <div className={styles.newsline}>
      <div>
        <CreatePost getNewsline={getNewsline} />
      </div>

      {posts &&
        posts.map((post) => {
          return <Post getNewsline={getNewsline} post={post} key={post.id} />
        })}
    </div>
  )
}

export default News
