import Item from './item/Item'
import { UserService } from '@/services/user/user.service'
import { useQuery } from 'react-query'

import styles from './Peoples.module.scss'

const Peoples = () => {
	const { isLoading, data } = useQuery(`get_all`, () => UserService.getAll(), {
		select: ({ data }) => data,
	})
	console.log(data)

	return (
		<div className={styles.peoples_wrapper}>
			<div className={styles.peoples}>
				<div className={styles.search}>ТУТ БУДЕТ ИНПУТ</div>
				<div>
					{data &&
						data.map((user) => {
							return <Item user={user} />
						})}
				</div>
			</div>
		</div>
	)
}

export default Peoples
