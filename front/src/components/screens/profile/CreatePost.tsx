import styles from './CreatePost.module.scss'

const CreatePost = () => {
	return (
		<div className={styles.create_post}>
			<div className={styles.textarea_wrapper}>
				<textarea
					name=""
					id=""
					placeholder="Что у вас нового?"
					wrap="cols"
				></textarea>
			</div>
		</div>
	)
}

export default CreatePost
