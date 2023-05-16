import { BirthDateComponentProps } from '../auth.interface'
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react'

import Input from '@/components/ui/form/Input'

import { useAuth } from '@/hooks/useAuth'
import { useNormalDate } from '@/hooks/useNormalDate'
import { useProfile } from '@/hooks/useProfile'

import { YEAR_REGEX } from '@/shared/regex'

import styles from './BirthDate.module.scss'

const BirthDateFields: FC<BirthDateComponentProps> = ({ formState, reg }) => {
	const { user } = useAuth()
	const { isLoading, data } = useProfile(user.id)
	const { day, month, year } = useNormalDate(data ? data.birthday : ``)

	const [dayInput, setDayInput] = useState(day)
	const [monthInput, setMonthInput] = useState(month)

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
						handleChangeValidate(e, 1, 31, setDayInput)
					}}
					value={dayInput}
					maxLength={2}
				/>
				<Input
					placeholder="Месяц"
					{...reg(`month`, {
						required: `Обязательные поля`,
					})}
					style={{ width: 43 }}
					onChange={(e) => {
						handleChangeValidate(e, 1, 12, setMonthInput)
					}}
					value={monthInput}
					maxLength={2}
				/>
				<Input
					placeholder="Год"
					{...reg(`year`, {
						value: year,
						pattern: {
							value: YEAR_REGEX,
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