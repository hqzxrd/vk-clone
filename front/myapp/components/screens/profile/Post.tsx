import Image from 'next/image'
import { FC } from 'react'

import styles from './Post.module.scss'

interface props {
	text: string
	imgs: string[] | null
}

const PostList: FC<props> = ({ text, imgs }) => {
	return (
		<div className={styles.post}>
			<div className={styles.postHeader}>
				<div className={styles.postAvatar}>
					<Image src={`/avatar.jpg`} width={50} height={50} alt="avatar" />
				</div>
				<div className={styles.whosePost}>Василий Абобович</div>
			</div>
			<div className={styles.postMain}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
				voluptates, dolore, sapiente vero laborum, ab nulla aut aliquam
				obcaecati rem eveniet praesentium ipsum dolor maxime quod ea reiciendis.
				Repudiandae, rerum iusto, excepturi sequi deleniti laudantium autem
				architecto ratione aperiam reprehenderit velit tempore? Ab expedita
				quisquam tenetur, quidem fugit explicabo sit mollitia. Consequuntur
				aspernatur ullam eum esse inventore, labore consequatur! Omnis, ratione
				molestiae, hic ipsum accusamus fugit dolorum consectetur suscipit libero
				odio illum eligendi, neque exercitationem eum tempora necessitatibus
				fugiat. Optio tempore at ratione ea id qui expedita distinctio, nostrum
				in nobis magni. Voluptate autem, quisquam itaque nisi architecto laborum
				error.
			</div>
			<div className={styles.postPic}>
				{imgs?.map((pic) => {
					return (
						<div className={styles.postPicWrapper} key={pic}>
							<Image src={pic} fill alt="avatar" />
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default PostList
