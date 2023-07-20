import { FC, KeyboardEvent, useState } from 'react'

import CamIcon from '@/components/ui/Icons/Post/CamIcon'
import SendIcon from '@/components/ui/Icons/Send'
import Textarea from '@/components/ui/Textarea/Textarea'

import styles from './SendMessage.module.scss'

interface props {
	send: (text: string, Cb: () => void) => void
}

const SendMessage: FC<props> = ({ send }) => {
	const [text, setText] = useState<string>(``)

	const pressEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === `Enter` && e.shiftKey == false) {
			e.preventDefault()
			send(text, () => setText(``))
		}
	}

	return (
		<div className={styles.sendMessage}>
			<div className={styles.camIcon}>
				<CamIcon />
			</div>
			<Textarea
				style={{ maxHeight: 150, width: `100%` }}
				text={text}
				setText={setText}
				resize={true}
				onKeyDown={(e) => pressEnter(e)}
			/>
			<div className={styles.sendIcon}>
				<SendIcon onClick={() => send(text, () => setText(``))} />
			</div>
		</div>
	)
}

export default SendMessage
