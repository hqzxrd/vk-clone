import Preview from './preview/Preview'
import { useRef } from 'react'

import Button from '@/components/ui/Form/Button'
import CamIcon from '@/components/ui/Icon/CamIcon'

import useSeveralPhotos from '@/hooks/useSeveralPhotos'

import styles from './CreatePost.module.scss'

const CreatePost = () => {
	const inputFiles = useRef<HTMLInputElement>(null)

	const { file, photos, handleChange, removePhoto } = useSeveralPhotos()

	const createPost = () => {
		//post
	}

	return (
		<div className={styles.create_post}>
			<div className={styles.textarea_wrapper}>
				<textarea
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
