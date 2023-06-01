import UpdatePost from './UpdatePost/UpdatePost'
import { PostService } from '@/services/post/post.service'
import { IPostDto } from '@/types/post.types'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'

import AvatarMini from '@/components/ui/AvatarMini/AvatarMini'
import LikeIcon from '@/components/ui/Icon/LikeIcon'
import PencilIcon from '@/components/ui/Icon/PencilIcon'

import { FilesUrl } from '@/config/api.config'

import { useAuth } from '@/hooks/useAuth'

import styles from './Post.module.scss'

interface props {
	post: IPostDto
}

const Post: FC<props> = ({ post }) => {
	const [isUpdate, setIsUpdate] = useState<boolean>(false)
	const [isLike, setIsLike] = useState<boolean>()
	const [countLiked, setCountLiked] = useState<number>(0)
	const { user } = useAuth()
	const queryClient = useQueryClient()

	const likePost = async () => {
		const res = await PostService.likePost(post.id)
		setIsLike(res.data.isLike)
		setCountLiked(res.data.countLikes)
		console.log(countLiked, res.data)
	}

	const deletePost = async () => {
		const res = await PostService.detelePost(post.id)
		if (res.status === 204) queryClient.invalidateQueries(`userPosts${user.id}`)
	}

	useEffect(() => {
		setIsLike(post.isLike)
		setCountLiked(post.countLikes)
	}, [])

	return (
		<div className={styles.post}>
			{user.id === post.author.id ? (
				<div className={styles.post_actions}>
					<div className={styles.update} onClick={() => setIsUpdate(!isUpdate)}>
						<PencilIcon />
					</div>
					<div className={styles.delete} onClick={() => deletePost()}>
						X
					</div>
				</div>
			) : (
				``
			)}
			<div className={styles.postHeader}>
				<div className={styles.postAvatar}>
					<AvatarMini user={post.author} width={60} height={60} isLink={true} />
				</div>
				<div className={styles.whosePost}>
					<Link href={`/users/${post.author.id}`}>
						{post.author.name} {post.author.surname}
					</Link>
				</div>
			</div>
			{isUpdate ? (
				<UpdatePost
					post={post}
					propsText={post.text}
					propsPhotos={post.photos}
					setIsUpdate={setIsUpdate}
				/>
			) : (
				<>
					<div className={styles.postMain}>{post.text}</div>
					<div className={styles.postPic}>
						{post.photos?.map((pic) => {
							return (
								<div className={styles.postPicWrapper} key={pic}>
									<Image src={FilesUrl(`${pic}`)} fill={true} alt="pic" />
								</div>
							)
						})}
					</div>
					<div className={styles.reactions}>
						<div
							className={isLike ? cn(styles.like, styles.isLiked) : styles.like}
							onClick={() => likePost()}
						>
							<LikeIcon />
							<div className={styles.like_count}>{countLiked}</div>
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default Post
