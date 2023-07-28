import { INotificationSSE } from '../../screens/notification/Notification.interface'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'

import AvatarMini from '@/components/ui/AvatarMini/AvatarMini'

import styles from './UserToast.module.scss'

const userToast = (message: INotificationSSE, text: string) => {
	return toast(
		(t) => (
			<div className={styles.toast} onClick={() => toast.dismiss(t.id)}>
				<div>
					<AvatarMini
						user={message.fromUser}
						width={50}
						height={50}
						isLink={false}
					/>
				</div>
				<div className={styles.main}>
					<div>
						<div>
							{message.fromUser.name} {message.fromUser.surname}
						</div>
					</div>
					<div>{text}</div>
				</div>
			</div>
		),
		{
			duration: 5000,
			style: {
				color: `white`,
				backgroundColor: `rgb(0, 0, 0, 0.5)`,
			},
		}
	)
}

export default userToast
