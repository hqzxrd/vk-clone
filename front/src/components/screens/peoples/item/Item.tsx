import { IUser } from '@/types/user.types'
import Link from 'next/link'
import { FC } from 'react'

import { useAvatarGenerate } from '@/hooks/useAvatarGenerate'

import styles from './item.module.scss'

const Item: FC<{ user: IUser }> = ({ user }) => {
	const color = useAvatarGenerate(user.name)

	return (
		<div className={styles.peoples_item}>
			<Link
				href={`/users/${user.id}`}
				style={{ backgroundColor: `${color}` }}
				className={styles.avatar}
			>
				<div>{user.name[0]}</div>
			</Link>

			<div className={styles.info}>
				<Link href={`/users/${user.id}`} className={styles.name}>
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
