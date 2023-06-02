import { ChangeEvent, Dispatch, FC, SetStateAction, useRef } from 'react'

import styles from './Textarea.module.scss'

interface props {
	text: string
	setText: Dispatch<SetStateAction<string>>
	resize: boolean
	placeholder?: string
}

const Textarea: FC<props> = ({ text, setText, resize, placeholder }) => {
	const textarea = useRef<HTMLTextAreaElement>(null)

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setText(e.target.value)

		if (textarea.current && resize) {
			textarea.current.style.height = 'auto'
			textarea.current.style.height = `${textarea.current.scrollHeight - 25}px`
		}
	}

	return (
		<textarea
			value={text}
			onChange={(e) => handleChange(e)}
			ref={textarea}
			className={styles.textarea}
			placeholder={placeholder}
			wrap="cols"
		/>
	)
}

export default Textarea
