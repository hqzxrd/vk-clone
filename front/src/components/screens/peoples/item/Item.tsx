import { IUser } from '@/types/user.types'
import Link from 'next/link'
import { FC } from 'react'

import AvatarMini from '@/components/ui/AvatarMini/AvatarMini'

import { userLink } from '@/utils/user-link'

import styles from './item.module.scss'

const Item: FC<{ user: IUser }> = ({ user }) => {
	return (
		<div className={styles.peoples_item}>
			<AvatarMini user={user} width={90} height={90} isLink={true} />
			<div className={styles.info}>
				<Link href={`/users/${userLink(user)}`} className={styles.name}>
					{`${user.name} ${user.surname}`}
				</Link>
				<div className={styles.status}>{user.status}</div>
				<div>
					<div className={styles.add}>Добавить в друзья</div>
				</div>
			</div>
		</div>
	)
}

export default Item
