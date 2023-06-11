import { IUser } from '@/types/user.types'
import Link from 'next/link'
import { FC } from 'react'

import AvatarMini from '@/components/ui/AvatarMini/AvatarMini'

import styles from './Item.module.scss'

const Item: FC<{ user: IUser }> = ({ user }) => {
	return (
		<div className={styles.peoples_item}>
			<AvatarMini user={user} width={90} height={90} isLink={true} />
			<div className={styles.info}>
				<Link href={`/users/${user.id}`} className={styles.name}>
					{`${user.name} ${user.surname}`}
				</Link>
				<div className={styles.status}>{user.status}</div>
				<div className={styles.actions}>
					<div className={styles.addOrDelete}>Удалить из друзей</div>
				</div>
			</div>
		</div>
	)
}

export default Item
