import {
	CSSProperties,
	ChangeEvent,
	Dispatch,
	FC,
	SetStateAction,
	TextareaHTMLAttributes,
	useEffect,
	useRef,
} from 'react'

import styles from './Textarea.module.scss'

interface props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	text: string
	setText: Dispatch<SetStateAction<string>>
	resize: boolean
	placeholder?: string
}

const Textarea: FC<props> = ({
	text,
	setText,
	resize,
	placeholder,
	...rest
}) => {
	const textarea = useRef<HTMLTextAreaElement>(null)

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setText(e.target.value)

		if (textarea.current && resize) {
			textarea.current.style.height = 'auto'
			textarea.current.style.height = `${textarea.current.scrollHeight}px`
		}
	}

	useEffect(() => {
		if (textarea.current && resize) {
			textarea.current.style.height = 'auto'
			textarea.current.style.height = `${textarea.current.scrollHeight}px`
		}
	}, [])

	return (
		<textarea
			{...rest}
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
