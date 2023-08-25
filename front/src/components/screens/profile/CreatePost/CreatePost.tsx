import Preview from "./preview/Preview"
import { PostService } from "@/services/post/post.service"
import { FC, KeyboardEvent, useRef, useState } from "react"
import { useQueryClient } from "react-query"

import Button from "@/components/ui/Form/Button"
import CamIcon from "@/components/ui/Icons/Post/CamIcon"
import Textarea from "@/components/ui/Textarea/Textarea"

import useSeveralPhotos from "@/hooks/useSeveralPhotos"

import styles from "./CreatePost.module.scss"
import { useParams } from "react-router-dom"
import { isEpmtyString } from "@/shared/regex"

interface props {
  getNewsline?: () => Promise<void>
}

const CreatePost: FC<props> = ({ getNewsline }) => {
  const inputFiles = useRef<HTMLInputElement>(null)
  const [text, setText] = useState<string>(``)
  const { file, photos, handleChange, removePhoto, clear } = useSeveralPhotos()
  const { userId } = useParams()
  const queryClient = useQueryClient()

  const pressEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === `Enter` && e.shiftKey == false) {
      e.preventDefault()
      createPost()
    }
  }

  const createPost = async () => {
    if (!isEpmtyString(text) && !file[0]) {
      return
    }
    clear()
    setText(``)
    const res = await PostService.createPost(text, file)
    if (res?.status === 201) {
      queryClient.invalidateQueries([`userPosts`, userId])
      getNewsline && getNewsline()
    }
  }

  return (
    <div className={styles.create_post}>
      <div className={styles.textarea_wrapper}>
        <Textarea
          text={text}
          setText={setText}
          resize={true}
          placeholder="Что у вас нового?"
          onKeyDown={(e) => pressEnter(e)}
          style={{ fontSize: 16 }}
          maxLength={3000}
        />
      </div>
      <Preview photos={photos} remove={removePhoto} />
      <div className={styles.buttons}>
        <Button onClick={() => createPost()}>Опубликовать</Button>
        <CamIcon
          onClick={() => {
            inputFiles.current!.value = ``
            inputFiles.current?.click()
          }}
        />
        <input
          onInput={(e) => handleChange(e)}
          style={{ display: "none" }}
          type="file"
          accept=".jpg,.jpeg"
          maxLength={8}
          multiple
          ref={inputFiles}
        />
      </div>
    </div>
  )
}

export default CreatePost
