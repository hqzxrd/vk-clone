import { ChangeEventHandler, useState } from 'react'

const useSeveralPhotos = () => {
	const [file, setFile] = useState<File[]>([])
	const [photos, setPhotos] = useState<string[]>([])

	const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		if (!e.target.files) {
			return
		}

		const files = e.target.files

		const reader = new FileReader()

		for (let i = 0; i < files.length; i++) {
			reader.readAsDataURL(files[i])

			reader.onloadend = () => {
				setPhotos((prev) => [...prev, reader.result as string])
				setFile((prev) => prev.concat(files[i]))
			}
		}
	}

	const removePhoto = (index: number) => {
		setPhotos((prev) => prev.filter((_, i) => i !== index))
		setFile((prev) => prev.filter((_, i) => i !== index))
	}

	return {
		file,
		photos,
		handleChange,
		removePhoto,
	}
}

export default useSeveralPhotos
