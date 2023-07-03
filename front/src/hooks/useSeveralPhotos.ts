import { ChangeEventHandler, FormEvent, useState } from 'react'

const useSeveralPhotos = () => {
	const [file, setFile] = useState<File[]>([])
	const [photos, setPhotos] = useState<string[]>([])
	const oldPhotos: string[] = []

	photos.map((str) => {
		const arrayPhotoStr = str.split(`:`)
		arrayPhotoStr[0] !== `data` && oldPhotos.push(str)
	})

	const handleChange = (e: FormEvent<HTMLInputElement>) => {
		if (!e.currentTarget.files) {
			return
		}

		const files = e.currentTarget.files
		console.log(files)

		for (let i = 0; i < files.length; i++) {
			let reader = new FileReader()
			reader.readAsDataURL(files[i])

			reader.onloadend = () => {
				setPhotos((prev) => [...prev, reader!.result as string])
				setFile((prev) => prev.concat(files[i]))
			}
		}
	}

	const removePhoto = (index: number) => {
		setPhotos((prev) => prev.filter((_, i) => i !== index))
		setFile((prev) => prev.filter((_, i) => i !== index))
	}

	const clear = () => {
		oldPhotos.length = 0
		setPhotos([])
		setFile([])
	}

	return {
		file,
		photos,
		oldPhotos,
		setPhotos,
		handleChange,
		removePhoto,
		clear,
	}
}

export default useSeveralPhotos
