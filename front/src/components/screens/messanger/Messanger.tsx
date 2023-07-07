import ChatItem from './ChatItem/ChatItem'

import Input from '@/components/ui/Form/Input'
import CrossIcon from '@/components/ui/Icons/CrossIcon'
import SearchIcon from '@/components/ui/Icons/Messanger/SearchIcon'
import Textarea from '@/components/ui/Textarea/Textarea'

import styles from './Messanger.module.scss'

const Messanger = () => {
	return (
		<div className={styles.messangerWrapper}>
			<div className={styles.messanger}>
				<div className={styles.header}>
					<SearchIcon />
					<input type="text" placeholder="Поиск" />
					<CrossIcon />
				</div>
				<div className={styles.allChats}>
					<ChatItem />
					<ChatItem />
					<ChatItem />
					<ChatItem />
					<ChatItem />
					<ChatItem />
					<ChatItem />
					<ChatItem />
					<ChatItem />
					<ChatItem />
					<ChatItem />
					<ChatItem />
					<ChatItem />
					<ChatItem />
					<ChatItem />
				</div>
			</div>
		</div>
	)
}

export default Messanger
