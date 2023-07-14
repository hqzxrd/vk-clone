import { FriendService } from '@/services/friends/friends.service'
import { Relationship } from '@/types/user.types'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'

import AcceptIcon from '@/components/ui/Icons/Profile/AcceptIcon'
import DeleteFriendIcon from '@/components/ui/Icons/Profile/DeleteFriendIcon'
import DenyIcon from '@/components/ui/Icons/Profile/DenyIcon'
import MessageIcon from '@/components/ui/Icons/Profile/MessageIcon'

import { useAuth } from '@/hooks/useAuth'
import { useAvatarGenerate } from '@/hooks/useAvatarGenerate'
import { useProfile } from '@/hooks/useProfile'

import { userLink } from '@/utils/user-link'

import styles from './UserActions.module.scss'

const UserActions = () => {
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
		<div className={styles.actions}>
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
							<div onClick={() => resOnFriendRequest(true)}>Принять</div>
							<div onClick={() => resOnFriendRequest(false)}>Отказать</div>
						</>
					)}
					{stateRequestFriend === 'friend' && (
						<div onClick={() => removeFriend()}>Удалить из друзей</div>
					)}
					<Link href={`/users/${userLink(profile)}/dialog`}>
						<MessageIcon />
					</Link>
				</>
			)}
		</div>
	)
}

export default UserActions
