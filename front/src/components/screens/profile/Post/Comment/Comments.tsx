import { useRef, useState } from 'react'

import AvatarMini from '@/components/ui/AvatarMini/AvatarMini'
import Textarea from '@/components/ui/Textarea/Textarea'

import { useProfile } from '@/hooks/useProfile'

import styles from './Comment.module.scss'

const Comments = () => {
	const [text, setText] = useState<string>(``)
	const { profile } = useProfile()

	if (!profile) return <></>

	return (
		<div className={styles.comments}>
			<div className={styles.comment}>
				<div>
					<AvatarMini
						user={profile}
						width={50}
						height={50}
						isLink={true}
					></AvatarMini>
				</div>
				<div className={styles.content}>
					<div className={styles.name}>
						{profile.name} {profile.surname}
					</div>
					<div className={styles.text}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed minima
						a modi maxime debitis porro odit voluptatem, repellat, suscipit,
						quam alias laboriosam doloremque reprehenderit quis temporibus id
						expedita atque nulla laudantium dolore esse necessitatibus. Nemo
						deleniti dicta eum. In, porro labore. Numquam dolores optio omnis
						labore quasi voluptatem modi hic!
					</div>
				</div>
			</div>
			<div className={styles.create_comment}>
				<div>
					<AvatarMini user={profile} width={35} height={35} isLink={false} />
				</div>
				<div className={styles.textarea_wrapper}>
					<Textarea
						text={text}
						setText={setText}
						resize={true}
						placeholder="Написать комментарий..."
					/>
				</div>
				<div>Отправить</div>
			</div>
		</div>
	)
}

export default Comments
