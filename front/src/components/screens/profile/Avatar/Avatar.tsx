import { FriendService } from '@/services/friends/friends.service'
import { Relationship } from '@/types/user.types'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'

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
		console.log(res.status)
	}

	const cancelRequest = async () => {
		const res = await FriendService.cancelRequest(profile!.id)
		res.status === 204 && queryClient.invalidateQueries(query)
		console.log(res.status)
	}

	const resOnFriendRequest = async (bool: boolean) => {
		const res = await FriendService.resOnFriendRequest(profile!.id, bool)
		res.status === 204 && queryClient.invalidateQueries(query)
		console.log(res.status)
	}

	const removeFriend = async () => {
		const res = await FriendService.removeFriend(profile!.id)
		res.status === 204 && queryClient.invalidateQueries(query)
	}

	return (
		<div className={styles.avatar}>
			<div className={styles.avatar_img}>
				{profile?.avatar ? (
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
				)}
			</div>

			{user.id === profile?.id ? (
				<div onClick={() => push(`/users/profile/edit`)}>
					Редактировать профиль
				</div>
			) : (
				<>
					{stateRequestFriend === 'none' && (
						<div onClick={() => sendRequest()}>Добавить в друзья</div>
					)}
					{stateRequestFriend === 'outgoing' && (
						<div onClick={() => cancelRequest()}>Отменить заявку</div>
					)}
					{stateRequestFriend === 'incoming' && (
						<>
							<div onClick={() => resOnFriendRequest(true)}>Принять запрос</div>
							<div onClick={() => resOnFriendRequest(false)}>
								Отказаться от дружбы
							</div>
						</>
					)}
					{stateRequestFriend === 'friend' && (
						<div onClick={() => removeFriend()}>Удалить из друзей</div>
					)}
					<div>Написать сообщение</div>
				</>
			)}
		</div>
	)
}

export default Avatar
