import Button from '@/components/ui/Form/Button'

import styles from './404.module.scss'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
	const nav = useNavigate()


	return (
		<div className={styles.wrapper}>
			<h2>Ой, мы не можем найти эту страницу...</h2>
			<div>
				Мы сожалеем, но страница на которую Вы пытались перейти не существует.
			</div>
			<Button onClick={() => nav(-1, { replace: true })}>Вернуться назад</Button>
		</div>
	)
}

export default NotFound
