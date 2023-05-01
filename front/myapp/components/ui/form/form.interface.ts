import { ButtonHTMLAttributes, InputHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export interface IInput {
	placeholder: string
	error?: FieldError | undefined
}

type TypeInputProps = InputHTMLAttributes<HTMLInputElement> & IInput

export interface IInputProps extends TypeInputProps {}
