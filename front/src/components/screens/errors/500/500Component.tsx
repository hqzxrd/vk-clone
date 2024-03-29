import Button from '@/components/ui/Form/Button'

import styles from './500.module.scss'
import { useNavigate } from 'react-router-dom'

const ServerError = () => {
	const nav = useNavigate()

	return (
		<div className={styles.wrapper}>
			<h2>Ой, что то пошло не так...</h2>
			<div>Мы совсем скоро всё исправим!</div>
			<Button onClick={() => nav(-1, { replace: true })}>Вернуться назад</Button>
		</div>
	)
}

export default ServerError
