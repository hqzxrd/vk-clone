import { IAvatarMiniProps } from './AvatarMini.interface'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { FilesUrl } from '@/config/api.config'

import { useAvatarGenerate } from '@/hooks/useAvatarGenerate'

import styles from './AvatarMini.module.scss'

const AvatarMini: FC<IAvatarMiniProps> = ({ user, width, height, isLink }) => {
	const color = useAvatarGenerate(user.name)

	if (isLink) {
		return (
			<div>
				{user.avatar ? (
					<Link href={`/users/${user.id}`}>
						<Image
							src={`${FilesUrl(user?.avatar)}`}
							width={width}
							height={height}
							alt="avatar"
							className={styles.avatar}
						/>
					</Link>
				) : (
					<Link
						href={`/users/${user.id}`}
						style={{
							backgroundColor: `${color}`,
							width: width,
							height: height,
							fontSize: width,
						}}
						className={styles.avatar}
					>
						<div>{user.name[0]}</div>
					</Link>
				)}
			</div>
		)
	} else {
		return (
			<div>
				{user.avatar ? (
					<div>
						<Image
							src={`${FilesUrl(user?.avatar)}`}
							width={width}
							height={height}
							alt="avatar"
							className={styles.avatar}
						/>
					</div>
				) : (
					<div
						style={{
							backgroundColor: `${color}`,
							width: width,
							height: height,
							fontSize: width,
						}}
						className={styles.avatar}
					>
						<div>{user.name[0]}</div>
					</div>
				)}
			</div>
		)
	}
}

export default AvatarMini
