import { Dispatch, FC, SetStateAction } from 'react'

import CrossIcon from '@/components/ui/Icons/CrossIcon'
import DeleteIcon from '@/components/ui/Icons/Messanger/DeleteIcon'
import PencilIcon from '@/components/ui/Icons/PencilIcon'

import styles from './HeaderOptions.module.scss'

interface props {
	activeMessage: number
	setActiveMessage: Dispatch<SetStateAction<number>>
	activeUpdate: number
	setActiveUpdate: Dispatch<SetStateAction<number>>
	deleteMessage: (id: number) => void
}

const HeaderOptions: FC<props> = ({
	activeMessage,
	setActiveMessage,
	setActiveUpdate,
	deleteMessage,
}) => {
	return (
		<div className={styles.header}>
			<div
				onClick={() => {
					deleteMessage(activeMessage)
					setActiveMessage(0)
					setActiveUpdate(0)
				}}
			>
				<DeleteIcon />
			</div>
			<div
				onClick={() => {
					setActiveUpdate(activeMessage)
				}}
			>
				<PencilIcon />
			</div>
			<div
				className={styles.cancel}
				onClick={() => {
					setActiveMessage(0)
					setActiveUpdate(0)
				}}
			>
				<CrossIcon />
			</div>
		</div>
	)
}

export default HeaderOptions
