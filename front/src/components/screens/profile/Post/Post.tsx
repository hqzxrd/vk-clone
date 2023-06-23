import Comments from './Comments/Comments'
import UpdatePost from './UpdatePost/UpdatePost'
import { PostService } from '@/services/post/post.service'
import { IPost } from '@/types/post.types'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'

import AvatarMini from '@/components/ui/AvatarMini/AvatarMini'
import CommentsIcon from '@/components/ui/Icon/CommentsIcon'
import LikeIcon from '@/components/ui/Icon/LikeIcon'
import PencilIcon from '@/components/ui/Icon/PencilIcon'

import { FilesUrl } from '@/config/api.config'

import { useAuth } from '@/hooks/useAuth'
import { useComments } from '@/hooks/useComments'
import { useDate } from '@/hooks/useDate'

import styles from './Post.module.scss'

interface props {
	post: IPost
}

const Post: FC<props> = ({ post }) => {
	const [isUpdate, setIsUpdate] = useState<boolean>(false)
	const [isLike, setIsLike] = useState<boolean>(post.isLike)
	const [countLiked, setCountLiked] = useState<number>(post.countLikes)
	const [commentsIsHide, setCommentsIsHide] = useState<boolean>(true)
	const { user } = useAuth()
	const { comments } = useComments(post.id, `?post=${post.id}`)
	const { day, month, year, time } = useDate(post.createDate)
	const queryClient = useQueryClient()

	const likePost = async () => {
		const res = await PostService.likePost(post.id)

		setIsLike(res.data.isLike)
		setCountLiked(res.data.countLikes)
	}

	const deletePost = async () => {
		const res = await PostService.detelePost(post.id)
		if (res.status === 204) queryClient.invalidateQueries(`userPosts${user.id}`)
	}

	useEffect(() => {
		setIsLike(post.isLike)
		setCountLiked(post.countLikes)
	}, [post])

	if (!comments) {
		return <></>
	}

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
					<div className={styles.date}>
						{day}.{month}.{year} в {time}
						{post.createDate !== post.updateDate ? ` (ред.)` : ``}
					</div>
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
						<div
							className={styles.like}
							onClick={() => setCommentsIsHide(!commentsIsHide)}
						>
							<CommentsIcon />
							<div className={styles.like_count}>
								{comments ? comments[1] : post.countComments}
							</div>
						</div>
					</div>
				</>
			)}

			{commentsIsHide ? <></> : <Comments post={post} />}
		</div>
	)
}

export default Post
