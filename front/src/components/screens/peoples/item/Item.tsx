import { IUser } from '@/types/user.types'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import AvatarMini from '@/components/ui/AvatarMini/AvatarMini'

import { FilesUrl } from '@/config/api.config'

import { useAvatarGenerate } from '@/hooks/useAvatarGenerate'

import styles from './item.module.scss'

const Item: FC<{ user: IUser }> = ({ user }) => {
	const color = useAvatarGenerate(user.name)

	return (
		<div className={styles.peoples_item}>
			<AvatarMini user={user} width={90} height={90} isLink={true} />
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
