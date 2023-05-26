import Image from 'next/image'
import { FC } from 'react'

import styles from './Preview.module.scss'

const Preview: FC<{ photos: string[]; remove: (index: number) => void }> = ({
	photos,
	remove,
}) => {
	return (
		<div className={styles.preview}>
			{photos.map((photoStr, i) => {
				return (
					<div className={styles.preview_img} key={i}>
						<div className={styles.delete} onClick={() => remove(i)}>
							X
						</div>
						<Image
							src={photoStr}
							width={80}
							height={80}
							quality={100}
							alt="photo"
						/>
					</div>
				)
			})}
		</div>
	)
}

export default Preview
