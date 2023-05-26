import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import AvatarMini from '@/components/ui/AvatarMini/AvatarMini'

import { useProfile } from '@/hooks/useProfile'

import styles from './Post.module.scss'

interface props {
	text: string
	imgs: string[] | null
}

const PostList: FC<props> = ({ text, imgs }) => {
	const { isLoading, data } = useProfile()
	return (
		<div className={styles.post}>
			<div className={styles.postHeader}>
				<div className={styles.postAvatar}>
					<AvatarMini user={data!} width={60} height={60} isLink={true} />
				</div>
				<div className={styles.whosePost}>
					<Link href={`/users/${data!.id}`}>
						{data?.name} {data?.surname}
					</Link>
				</div>
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
							<Image src={pic} width={500} height={500} alt="avatar" />
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default PostList
