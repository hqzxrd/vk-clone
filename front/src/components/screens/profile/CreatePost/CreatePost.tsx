import Preview from './preview/Preview'
import { PostService } from '@/services/post/post.service'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { useQueryClient } from 'react-query'

import Button from '@/components/ui/Form/Button'
import CamIcon from '@/components/ui/Icon/CamIcon'

import useSeveralPhotos from '@/hooks/useSeveralPhotos'

import styles from './CreatePost.module.scss'

const CreatePost = () => {
	const inputFiles = useRef<HTMLInputElement>(null)
	const textarea = useRef<HTMLTextAreaElement>(null)
	const { file, photos, handleChange, removePhoto, clear } = useSeveralPhotos()
	const [text, setText] = useState<string>(``)
	const { query } = useRouter()
	const queryClient = useQueryClient()

	const createPost = async () => {
		clear()
		setText(``)
		const res = await PostService.createPost(text, file)
		res.status === 201 && queryClient.invalidateQueries(`userPosts${query.id}`)
	}

	return (
		<div className={styles.create_post}>
			<div className={styles.textarea_wrapper}>
				<textarea
					value={text}
					onChange={(e) => setText(e.target.value)}
					ref={textarea}
					className={styles.textarea}
					placeholder="Что у вас нового?"
					wrap="cols"
				></textarea>
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
