import {
	FC,
	KeyboardEvent,
	RefObject,
	useEffect,
	useRef,
	useState,
} from 'react'

import CamIcon from '@/components/ui/Icons/Post/CamIcon'
import SendIcon from '@/components/ui/Icons/Send'
import Textarea from '@/components/ui/Textarea/Textarea'

import styles from './SendMessage.module.scss'

interface props {
	send: (text: string, Cb: () => void) => void
	messagesBlock: RefObject<HTMLDivElement>
}

const SendMessage: FC<props> = ({ send, messagesBlock }) => {
	const [text, setText] = useState<string>(``)
	const sendBlockRef = useRef<HTMLDivElement>(null)
	const messagesBaseHeight = useRef<number>(0)
	const pressEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === `Enter` && e.shiftKey == false) {
			e.preventDefault()
			send(text, () => setText(``))
		}
	}

	useEffect(() => {
		if (!sendBlockRef.current || !messagesBlock.current) return

		const msh = messagesBlock.current.clientHeight
		const sbh = sendBlockRef.current.clientHeight
		const sendBaseHeight = 52
		const offset = sbh - sendBaseHeight

		messagesBlock.current.style.marginBottom = `${offset + 15}px`

		if (messagesBaseHeight.current === 0) {
			messagesBaseHeight.current = msh
		}

		if (messagesBaseHeight.current === 0) {
			return
		}

		messagesBlock.current.style.height = `${
			messagesBaseHeight.current - offset
		}px`
	}, [text])

	return (
		<div className={styles.sendMessage} ref={sendBlockRef}>
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
