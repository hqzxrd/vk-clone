import { ChangeEventHandler, useState } from 'react'

const usePrepareAvatar = () => {
	const [file, setFile] = useState<File | null>(null)
	const [avatar, setAvatar] = useState<string>(``)

	const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		if (!e.target.files) {
			return
		}
		const file = e.target.files[0]

		const reader = new FileReader()

		reader.readAsDataURL(file)

		reader.onloadend = () => {
			setFile(file)
			setAvatar(reader.result as string)
		}
	}
	return { file, avatar, handleChange }
}

export default usePrepareAvatar
