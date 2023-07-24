import { Dispatch, FC, SetStateAction } from 'react'

import CrossIcon from '@/components/ui/Icons/CrossIcon'
import DeleteIcon from '@/components/ui/Icons/Messanger/DeleteIcon'
import PencilIcon from '@/components/ui/Icons/PencilIcon'

import styles from './HeaderOptions.module.scss'

interface props {
	active: number
	setActive: Dispatch<SetStateAction<number>>
	deleteMessage: (id: number) => void
}

const HeaderOptions: FC<props> = ({ active, setActive, deleteMessage }) => {
	return (
		<div className={styles.header}>
			<div onClick={() => deleteMessage(active)}>
				<DeleteIcon />
			</div>
			<div>
				<PencilIcon />
			</div>
			<div className={styles.cancel} onClick={() => setActive(0)}>
				<CrossIcon />
			</div>
		</div>
	)
}

export default HeaderOptions
