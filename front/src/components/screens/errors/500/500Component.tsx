import { useRouter } from 'next/router'

import Button from '@/components/ui/Form/Button'

import styles from './500.module.scss'

const ServerError = () => {
	const { replace } = useRouter()

	return (
		<div className={styles.wrapper}>
			<h2>Ой, что то пошло не так...</h2>
			<div>Мы совсем скоро всё исправим!</div>
			<Button onClick={() => replace(`/`)}>Вернуться на главную</Button>
		</div>
	)
}

export default ServerError
