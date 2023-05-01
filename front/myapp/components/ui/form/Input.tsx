import { IInputProps } from './form.interface'
import React, { forwardRef } from 'react'

import styles from './form.module.scss'

const Input = forwardRef<HTMLInputElement, IInputProps>(
	({ placeholder, error, type = `text`, ...rest }, ref) => {
		return (
			<>
				<input
					ref={ref}
					className={styles.input}
					type={type}
					placeholder={placeholder}
					{...rest}
				/>
				{<div className={styles.error}>{error && error.message}</div>}
			</>
		)
	}
)

export default Input
