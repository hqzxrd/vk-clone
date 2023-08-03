
import Button from '@/components/ui/Form/Button'

import styles from './UserNotFound.module.scss'
import { useNavigate } from 'react-router-dom'

const UserNotFound = () => {
	const nav = useNavigate()


	return (
		<div className={styles.wrapper}>
			<h2>Такого пользователя не существует</h2>
			<Button onClick={() => nav(-1, { replace: true })}>Вернуться назад</Button>
		</div>
	)
}

export default UserNotFound
