import Preview from '../../CreatePost/preview/Preview'
import { PostService } from '@/services/post/post.service'
import { IPostDto } from '@/types/post.types'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { useQueryClient } from 'react-query'

import Button from '@/components/ui/Form/Button'
import CamIcon from '@/components/ui/Icon/CamIcon'

import { FilesUrl } from '@/config/api.config'

import useSeveralPhotos from '@/hooks/useSeveralPhotos'

import styles from './UpdatePost.module.scss'

interface props {
	post: IPostDto
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
	const textarea = useRef<HTMLTextAreaElement>(null)
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
	const { query } = useRouter()
	const queryClient = useQueryClient()

	const UpdatePost = async () => {
		console.log(oldPhotos)

		const res = await PostService.updatePost(post.id, text, file, oldPhotos)

		res.status === 200 && queryClient.invalidateQueries(`userPosts${query.id}`)
		clear()
		setText(``)
		setIsUpdate(false)
	}

	const resizeTextarea = (e?: ChangeEvent<HTMLTextAreaElement>) => {
		if (textarea.current) {
			textarea.current.style.height = 'auto'
			textarea.current.style.height = `${textarea.current.scrollHeight}px`
		}
	}

	const handleChangeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setText(e.target.value)
		resizeTextarea(e)
	}

	useEffect(() => {
		resizeTextarea()
		propsPhotos && setPhotos((prev) => [...prev, ...propsPhotos])
	}, [])

	return (
		<div className={styles.update_post}>
			<div className={styles.textarea_wrapper}>
				<textarea
					value={text}
					onChange={(e) => handleChangeTextarea(e)}
					ref={textarea}
					className={styles.textarea}
					placeholder=""
					wrap="cols"
				></textarea>
			</div>

			<Preview photos={photos} remove={removePhoto} />
			<div className={styles.buttons}>
				<Button onClick={() => UpdatePost()}>Сохранить</Button>
				<CamIcon onClick={() => inputFiles.current?.click()} />
				<input
					onChange={(e) => handleChange(e)}
					style={{ display: 'none' }}
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
