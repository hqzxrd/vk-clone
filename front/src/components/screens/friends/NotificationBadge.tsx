import { useTypedSelector } from '@/hooks/useTypedSelector'

import styles from './Friends.module.scss'

const NotificationBadge = () => {
	const { notifications } = useTypedSelector((st) => st.user)
	return (
		<div>
			{notifications.notificationIncomingCount !== 0 && (
				<div className={styles.notifCount}>
					{notifications.notificationIncomingCount}
				</div>
			)}
		</div>
	)
}

export default NotificationBadge
