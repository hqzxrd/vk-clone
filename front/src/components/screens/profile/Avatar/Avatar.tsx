import AvatarMini from '@/components/ui/AvatarMini/AvatarMini'

import { useProfile } from '@/hooks/useProfile'

import styles from './Avatar.module.scss'

const Avatar = () => {
	const { profile } = useProfile()

	if (!profile) {
		return <></>
	}

	return (
		<div className={styles.avatar}>
			<div className={styles.avatar_img}>
				<AvatarMini user={profile} width={250} height={250} isLink={false} />
			</div>
		</div>
	)
}

export default Avatar
