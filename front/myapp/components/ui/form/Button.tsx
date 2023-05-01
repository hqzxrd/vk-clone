import { IButtonProps } from './form.interface'
import { FC } from 'react'

import styles from './form.module.scss'

const Button: FC<IButtonProps> = ({ children, ...rest }) => {
	return (
		<button className={styles.button} type="submit" {...rest}>
			{children}
		</button>
	)
}

export default Button
