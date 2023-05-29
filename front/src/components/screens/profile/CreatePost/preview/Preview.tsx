import Image from 'next/image'
import { FC } from 'react'

import { FilesUrl } from '@/config/api.config'

import styles from './Preview.module.scss'

interface props {
	photos: string[]
	remove: (index: number) => void
}

const Preview: FC<props> = ({ photos, remove }) => {
	return (
		<div className={styles.preview}>
			{photos.map((photoStr, i) => {
				const arrayPhotoStr = photoStr.split(`:`)

				return (
					<div className={styles.preview_img} key={i}>
						<div className={styles.delete} onClick={() => remove(i)}>
							X
						</div>
						{arrayPhotoStr[0] === `data` ? (
							<Image src={photoStr} fill={true} alt="photo" />
						) : (
							<Image src={FilesUrl(photoStr)} fill={true} alt="photo" />
						)}
					</div>
				)
			})}
		</div>
	)
}

export default Preview
