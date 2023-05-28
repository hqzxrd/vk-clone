import { PostService } from '@/services/post/post.service'
import { IPostDto } from '@/types/post.types'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'
import { useQueryClient } from 'react-query'

import AvatarMini from '@/components/ui/AvatarMini/AvatarMini'
import LikeIcon from '@/components/ui/Icon/LikeIcon'

import { FilesUrl } from '@/config/api.config'

import { useAuth } from '@/hooks/useAuth'

import styles from './Post.module.scss'

interface props {
	post: IPostDto
}

const Post: FC<props> = ({ post }) => {
	const { user } = useAuth()
	const queryClient = useQueryClient()

	const likePost = () => {
		PostService.likePost(post.id)
	}

	const deletePost = async () => {
		const res = await PostService.detelePost(post.id)
		if (res.status === 204) queryClient.invalidateQueries(`userPosts${user.id}`)
	}

	return (
		<div className={styles.post}>
			{user.id === post.author.id ? (
				<div className={styles.delete} onClick={() => deletePost()}>
					X
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
			<div className={styles.postMain}>{post.text}</div>
			<div className={styles.postPic}>
				{post.photos?.map((pic) => {
					return (
						<div className={styles.postPicWrapper} key={pic}>
							<Image
								src={FilesUrl(`${pic}`)}
								width={500}
								height={500}
								alt="avatar"
							/>
						</div>
					)
				})}
			</div>
			<div className={styles.reactions}>
				<div
					className={
						post.isLike ? cn(styles.like, styles.isLiked) : styles.like
					}
					onClick={() => likePost()}
				>
					<LikeIcon />
					<div className={styles.like_count}>{post.likes}</div>
				</div>
			</div>
		</div>
	)
}

export default Post
