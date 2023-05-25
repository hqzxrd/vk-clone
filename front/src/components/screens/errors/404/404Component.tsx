import { useRouter } from 'next/router'

import Button from '@/components/ui/Form/Button'

import styles from './404.module.scss'

const NotFound = () => {
	const { replace } = useRouter()

	return (
		<div className={styles.wrapper}>
			<h2>Ой, мы не можем найти эту страницу...</h2>
			<div>
				Мы сожалеем, но страница на которую Вы пытались перейти не существует.
			</div>
			<Button onClick={() => replace(`/`)}>Вернуться на главную</Button>
		</div>
	)
}

export default NotFound
