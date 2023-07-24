import { IUserChatsInfo } from '@/types/messages.types'
import { FC } from 'react'

import AvatarMini from '@/components/ui/AvatarMini/AvatarMini'

import styles from './Header.module.scss'

interface props {
	withUser: IUserChatsInfo
}

const Header: FC<props> = ({ withUser }) => {
	return (
		<div className={styles.header}>
			<div>Мессенджер</div>
			<div>
				{withUser.name} {withUser.surname}
			</div>
			<div>
				<AvatarMini user={withUser} width={25} height={25} isLink={false} />
			</div>
		</div>
	)
}

export default Header
