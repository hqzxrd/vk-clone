import Preview from './preview/Preview'
import { PostService } from '@/services/post/post.service'
import { useRouter } from 'next/router'
import { KeyboardEvent, useRef, useState } from 'react'
import { useQueryClient } from 'react-query'

import Button from '@/components/ui/Form/Button'
import CamIcon from '@/components/ui/Icons/Post/CamIcon'
import Textarea from '@/components/ui/Textarea/Textarea'

import useSeveralPhotos from '@/hooks/useSeveralPhotos'

import styles from './CreatePost.module.scss'

const CreatePost = () => {
	const inputFiles = useRef<HTMLInputElement>(null)
	const [text, setText] = useState<string>(``)
	const { file, photos, handleChange, removePhoto, clear } = useSeveralPhotos()

	const { query } = useRouter()
	const queryClient = useQueryClient()

	const pressEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === `Enter` && e.shiftKey == false) {
			e.preventDefault()
			createPost()
		}
	}

	const createPost = async () => {
		clear()
		setText(``)
		const res = await PostService.createPost(text, file)
		res.status === 201 && queryClient.invalidateQueries(`userPosts${query.id}`)
	}

	return (
		<div className={styles.create_post}>
			<div className={styles.textarea_wrapper}>
				<Textarea
					text={text}
					setText={setText}
					resize={false}
					placeholder="Что у вас нового?"
					onKeyDown={(e) => pressEnter(e)}
				/>
			</div>
			<Preview photos={photos} remove={removePhoto} />
			<div className={styles.buttons}>
				<Button onClick={() => createPost()}>Опубликовать</Button>
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

export default CreatePost
