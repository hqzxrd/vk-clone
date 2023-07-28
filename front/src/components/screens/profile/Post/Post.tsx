import Comments from './Comments/Comments'
import UpdatePost from './UpdatePost/UpdatePost'
import { PostService } from '@/services/post/post.service'
import { IPost } from '@/types/post.types'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'

import AvatarMini from '@/components/ui/AvatarMini/AvatarMini'
import PencilIcon from '@/components/ui/Icons/PencilIcon'
import CommentsIcon from '@/components/ui/Icons/Post/CommentsIcon'
import LikeIcon from '@/components/ui/Icons/Post/LikeIcon'

import { FilesUrl } from '@/config/api.config'

import { useAuth } from '@/hooks/useAuth'
import { useComments } from '@/hooks/useComments'
import { useDate } from '@/hooks/useDate'

import { userLink } from '@/utils/user-link'

import styles from './Post.module.scss'

interface props {
	post: IPost
	getNewsline?: () => Promise<void>
}

const Post: FC<props> = ({ post, getNewsline }) => {
	const [isUpdate, setIsUpdate] = useState<boolean>(false)
	const [isLike, setIsLike] = useState<boolean>(post.isLike)
	const [countLiked, setCountLiked] = useState<number>(post.countLikes)
	const [commentsIsHide, setCommentsIsHide] = useState<boolean>(true)
	const { query } = useRouter()
	const { user } = useAuth()

	const { comments } = useComments(post.id, `?post=${post.id}`, commentsIsHide)
	const { day, month, year, time } = useDate(post.createDate)
	const queryClient = useQueryClient()

	const likePost = async () => {
		const res = await PostService.likePost(post.id)

		setIsLike(res.data.isLike)
		setCountLiked(res.data.countLikes)
	}

	const deletePost = async () => {
		const res = await PostService.detelePost(post.id)
		if (res?.status === 204) {
			queryClient.invalidateQueries(`userPosts${query.id}`)
			getNewsline && getNewsline()
		}
	}

	useEffect(() => {
		setIsLike(post.isLike)
		setCountLiked(post.countLikes)
	}, [post])

	return (
		<div className={styles.post}>
			{user.id === post.author.id && getNewsline === undefined ? (
				<div className={styles.post_actions}>
					<div className={styles.update} onClick={() => setIsUpdate(!isUpdate)}>
						<PencilIcon />
					</div>
					<div className={styles.delete} onClick={() => deletePost()}>
						X
					</div>
				</div>
			) : null}
			<div className={styles.postHeader}>
				<div className={styles.postAvatar}>
					<AvatarMini user={post.author} width={60} height={60} isLink={true} />
				</div>
				<div className={styles.whosePost}>
					<Link href={`/users/${userLink(post.author)}`}>
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
