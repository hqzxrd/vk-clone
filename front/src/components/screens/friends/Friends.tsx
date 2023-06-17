import Item from './item/Item'
import { UserService } from '@/services/user/user.service'
import cn from 'classnames'
import { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'

import { useAuth } from '@/hooks/useAuth'

import styles from './Friends.module.scss'

const tabs = [`Все друзья`, `Входящие`, `Исходящие`]

const Friends = () => {
	const [activeTab, setActiveTab] = useState<number>(0)
	const { user } = useAuth()
	const queryClient = useQueryClient()
	const { data: friends } = useQuery(
		`get_friends`,
		() => UserService.getFriends(user.id),
		{
			select: ({ data }) => data,
		}
	)

	const { data: incoming } = useQuery(
		`get_incoming`,
		() => UserService.getRequest(`incoming`),
		{
			select: ({ data }) => data,
		}
	)

	const { data: outgoing } = useQuery(
		`get_outgoing`,
		() => UserService.getRequest(`outgoing`),
		{
			select: ({ data }) => data,
		}
	)

	useEffect(() => {
		if (activeTab === 0) queryClient.invalidateQueries(`get_friends`)
		if (activeTab === 1) queryClient.invalidateQueries(`get_incoming`)
		if (activeTab === 2) queryClient.invalidateQueries(`get_outgoing`)
	}, [activeTab])

	return (
		<div className={styles.friends_wrapper}>
			<div className={styles.friends}>
				<div className={styles.tabs}>
					{tabs.map((tab, i) => {
						return (
							<div
								className={
									activeTab === i
										? cn(styles.tabItem, styles.tabItem_active)
										: styles.tabItem
								}
								onClick={() => setActiveTab(i)}
							>
								{tab}
							</div>
						)
					})}
				</div>
				<div>
					{friends && activeTab === 0 ? (
						<div>
							{friends[0].map((user) => {
								return <Item user={user} key={user.id} state={activeTab} />
							})}
						</div>
					) : (
						<></>
					)}

					{incoming && activeTab === 1 ? (
						<div>
							{incoming[0].map((user) => {
								return <Item user={user} key={user.id} state={activeTab} />
							})}
						</div>
					) : (
						<></>
					)}

					{outgoing && activeTab === 2 ? (
						<div>
							{outgoing[0].map((user) => {
								return <Item user={user} key={user.id} state={activeTab} />
							})}
						</div>
					) : (
						<></>
					)}
				</div>
			</div>
		</div>
	)
}

export default Friends
