import Preview from "../../CreatePost/preview/Preview"
import { PostService } from "@/services/post/post.service"
import { IPost } from "@/types/post.types"
import { FC, useEffect, useRef, useState } from "react"
import { useQueryClient } from "react-query"

import Button from "@/components/ui/Form/Button"
import CamIcon from "@/components/ui/Icons/Post/CamIcon"
import Textarea from "@/components/ui/Textarea/Textarea"

import useSeveralPhotos from "@/hooks/useSeveralPhotos"

import styles from "./UpdatePost.module.scss"
import { useParams } from "react-router-dom"

interface props {
  post: IPost
  propsText?: string
  propsPhotos?: string[]
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>
}

const UpdatePost: FC<props> = ({
  post,
  propsText,
  propsPhotos,
  setIsUpdate,
}) => {
  const inputFiles = useRef<HTMLInputElement>(null)
  const {
    file,
    photos,
    setPhotos,
    oldPhotos,
    handleChange,
    removePhoto,
    clear,
  } = useSeveralPhotos()

  const [text, setText] = useState<string>(propsText ? propsText : ``)
  const { userId } = useParams()
  const queryClient = useQueryClient()

  const UpdatePost = async () => {
    const res = await PostService.updatePost(post.id, text, file, oldPhotos)

    if (res?.status === 200) {
      clear()
      setText(``)
      setIsUpdate(false)
      queryClient.invalidateQueries([`userPosts`, userId])
    }
  }

  useEffect(() => {
    propsPhotos && setPhotos((prev) => [...prev, ...propsPhotos])
  }, [])

  return (
    <div className={styles.update_post}>
      <div className={styles.textarea_wrapper}>
        <Textarea
          text={text}
          setText={setText}
          resize={true}
          style={{ fontSize: 16 }}
        />
      </div>

      <Preview photos={photos} remove={removePhoto} />
      <div className={styles.buttons}>
        <Button onClick={() => UpdatePost()}>Сохранить</Button>
        <CamIcon onClick={() => inputFiles.current?.click()} />
        <input
          onChange={(e) => handleChange(e)}
          style={{ display: "none" }}
          type="file"
          accept=".jpg,.jpeg"
          maxLength={4}
          multiple
          ref={inputFiles}
        />
      </div>
    </div>
  )
}

export default UpdatePost
