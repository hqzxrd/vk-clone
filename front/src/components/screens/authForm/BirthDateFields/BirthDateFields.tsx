import { IAuthFields, propsRegInput } from '../auth.interface'
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react'
import { FormState, UseFormRegister, set } from 'react-hook-form'

import Input from '@/components/ui/form/Input'

import styles from './BirthDate.module.scss'

interface props extends propsRegInput {
	formState: FormState<IAuthFields>
}

const yearRegExp = /^(19[2-9]\d|20[0-1]\d|202[0-3])$/

const BirthDateFields: FC<props> = ({ formState, reg }) => {
	const [day, setDay] = useState(``)
	const [month, setMonth] = useState(``)

	const handleChangeValidate = (
		e: ChangeEvent<HTMLInputElement>,
		val1: number,
		val2: number,
		setValue: Dispatch<SetStateAction<string>>
	): void => {
		const value = e.target.value

		if (typeof +value !== `number`) {
			setValue(``)
		}

		if (+value >= val1 && +value <= val2) {
			setValue(value)
		} else {
			setValue(``)
		}
	}

	return (
		<>
			<div className={styles.birth}>
				<Input
					placeholder="День"
					{...reg(`day`, {
						required: `Обязательные поля`,
					})}
					style={{ width: 43 }}
					onChange={(e) => {
						handleChangeValidate(e, 1, 31, setDay)
					}}
					value={day}
					maxLength={2}
				/>
				<Input
					placeholder="Месяц"
					{...reg(`month`, {
						required: `Обязательные поля`,
					})}
					style={{ width: 43 }}
					onChange={(e) => {
						handleChangeValidate(e, 1, 12, setMonth)
					}}
					value={month}
					maxLength={2}
				/>
				<Input
					placeholder="Год"
					{...reg(`year`, {
						pattern: {
							value: yearRegExp,
							message: `Введите корректный год рождения`,
						},
						required: `Обязательные поля`,
					})}
					style={{ width: 43 }}
					maxLength={4}
				/>
			</div>

			{
				<div className={styles.error}>
					{
						(formState.errors.day && formState.errors.day.message,
						formState.errors.month && formState.errors.month.message,
						formState.errors.year && formState.errors.year.message)
					}
				</div>
			}
		</>
	)
}

export default BirthDateFields
