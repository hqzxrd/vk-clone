import { propsForInput, propsRegInput } from '../auth.interface'
import cn from 'classnames'
import { FC, useState } from 'react'

import Input from '@/components/ui/form/Input'

import styles from './GenderSelector.module.scss'

const GenderSelector: FC<propsRegInput> = ({ reg }) => {
	const [gender, setGender] = useState<`male` | `famale`>(`male`)

	return (
		<div className={styles.selector}>
			<div
				className={cn(styles.select1, gender === `male` && styles.active)}
				onClick={() => {
					setGender(`male`)
				}}
			>
				Мужской
			</div>
			<div
				className={cn(styles.select2, gender === `famale` && styles.active)}
				onClick={() => {
					setGender(`famale`)
				}}
			>
				Женский
			</div>
			<div>
				<Input
					{...reg(`gender`)}
					value={gender}
					type="hidden"
					placeholder="gender"
				/>
			</div>
		</div>
	)
}

export default GenderSelector
