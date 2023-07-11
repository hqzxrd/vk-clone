import { FriendService } from '@/services/friends/friends.service'
import { Relationship } from '@/types/user.types'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'

import AvatarMini from '@/components/ui/AvatarMini/AvatarMini'

import { FilesUrl } from '@/config/api.config'

import { useAuth } from '@/hooks/useAuth'
import { useAvatarGenerate } from '@/hooks/useAvatarGenerate'
import { useProfile } from '@/hooks/useProfile'

import styles from './Avatar.module.scss'

const Avatar = () => {
	const [stateRequestFriend, setStateRequestFriend] =
		useState<Relationship>('none')
	const { profile } = useProfile()
	const { user } = useAuth()
	const { push, query } = useRouter()
	const color = useAvatarGenerate(profile?.name!)
	const queryClient = useQueryClient()

	useEffect(() => {
		if (profile) setStateRequestFriend(profile.typeRelationship)
	}, [profile])

	const sendRequest = async () => {
		const res = await FriendService.sendRequest(profile!.id)
		res.status === 200 && queryClient.invalidateQueries(query)
	}

	const cancelRequest = async () => {
		const res = await FriendService.cancelRequest(profile!.id)
		res.status === 204 && queryClient.invalidateQueries(query)
	}

	const resOnFriendRequest = async (bool: boolean) => {
		const res = await FriendService.resOnFriendRequest(profile!.id, bool)
		res.status === 204 && queryClient.invalidateQueries(query)
	}

	const removeFriend = async () => {
		const res = await FriendService.removeFriend(profile!.id)
		res.status === 204 && queryClient.invalidateQueries(query)
	}

	if (!profile) {
		return <></>
	}

	return (
		<div className={styles.avatar}>
			<div className={styles.avatar_img}>
				<AvatarMini user={profile} width={250} height={250} isLink={false} />
				{/* {profile?.avatar ? (
					<Image
						priority={true}
						src={`${FilesUrl(profile?.avatar)}`}
						width={300}
						height={300}
						quality={100}
						alt="avatar"
					/>
				) : (
					<div
						style={{ backgroundColor: color }}
						className={styles.avatar_placeholder}
					>
						{profile?.name[0]}
					</div>
				)} */}
			</div>
		</div>
	)
}

export default Avatar
