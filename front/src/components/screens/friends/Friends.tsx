import Item from './item/Item'
import { UserService } from '@/services/user/user.service'
import { useQuery } from 'react-query'

import styles from './Friends.module.scss'

const Friends = () => {
	const { data } = useQuery(`get_all`, () => UserService.getAll(), {
		select: ({ data }) => data,
	})

	return (
		<div className={styles.friends_wrapper}>
			<div className={styles.friends}>
				<div className={styles.tabs}>
					<div className={styles.tabItem}>Все друзья</div>
					<div className={styles.tabItem}>Входящие</div>
					<div className={styles.tabItem}>Исходящие</div>
					<div>-- ne rabotaet</div>
				</div>

				<div>
					{data &&
						data.map((user) => {
							return <Item user={user} key={user.id} />
						})}
				</div>
			</div>
		</div>
	)
}

export default Friends
