import Preview from '../../CreatePost/preview/Preview'
import { PostService } from '@/services/post/post.service'
import { useRouter } from 'next/router'
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { useQueryClient } from 'react-query'

import Button from '@/components/ui/Form/Button'
import CamIcon from '@/components/ui/Icon/CamIcon'

import useSeveralPhotos from '@/hooks/useSeveralPhotos'

import styles from './UpdatePost.module.scss'

interface props {
	propsText?: string
	propsPhotos?: string[]
}

const UpdatePost: FC<props> = ({ propsText, propsPhotos }) => {
	const inputFiles = useRef<HTMLInputElement>(null)
	const textarea = useRef<HTMLTextAreaElement>(null)
	const { file, photos, handleChange, removePhoto, clear } = useSeveralPhotos()
	const [text, setText] = useState<string>(propsText ? propsText : ``)
	const { query } = useRouter()
	const queryClient = useQueryClient()

	const UpdatePost = async () => {
		clear()
		setText(``)
		const res = await PostService.createPost(text, file)
		res.status === 201 && queryClient.invalidateQueries(`userPosts${query.id}`)
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
