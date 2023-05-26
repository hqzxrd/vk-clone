import { ChangeEventHandler, useState } from 'react'

const usePhoto = () => {
	const [file, setFile] = useState<File | null>(null)
	const [avatar, setAvatar] = useState<string>(``)
	const [errorSize, setErrorSize] = useState<boolean>(false)

	const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		if (!e.target.files) {
			return
		}
		const file = e.target.files[0]

		const reader = new FileReader()

		reader.readAsDataURL(file)

		reader.onloadend = async () => {
			const image = new Promise<boolean>((resolve, reject) => {
				const img = new Image()
				img.src = reader.result as string
				img.onload = () => {
					if (img.width < 300 || img.height < 300 || img.width > img.height) {
						setErrorSize(true)
						reject(true)
					}
					resolve(false)
				}
			})

			image.then((isError) => {
				if (!isError) {
					setErrorSize(false)
					setFile(file)
					setAvatar(reader.result as string)
				}
			})
		}
	}

	return { file, avatar, errorSize, handleChange }
}

export default usePhoto
