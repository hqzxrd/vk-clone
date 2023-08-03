import CreatePost from './CreatePost/CreatePost'
import Info from './Info/Info'
import Post from './Post/Post'
import { IPost } from '@/types/post.types'

import { useAuth } from '@/hooks/useAuth'
import { usePosts } from '@/hooks/usePosts'
import { useProfile } from '@/hooks/useProfile'

import styles from './Profile.module.scss'
import { useParams } from 'react-router-dom'
import UserNotFound from '../errors/UserNotFound/UserNotFound'

const Profile = () => {
	const { user } = useAuth()
	const { isLoading, profile } = useProfile()
	const { userId } = useParams()
	const { posts } = usePosts(`?user=${userId}`)

	if (isLoading) return null

	if (!profile || !posts) {
		return <UserNotFound />
	}

	return (
		<div className={styles.wrapper}>
			<Info />
			{isNaN(+userId!)
				? user.nickname === userId && <CreatePost />
				: user.id === +userId! && <CreatePost />}

			{posts[0].map((post: IPost) => {
				return <Post post={post} key={post.id} />
			})}

			{!posts[1] && user.id === profile.id ? (
				<div className={styles.noPosts}>У вас нет еще ни одной записи</div>
			) : (
				''
			)}

			{!posts[1] && user.id !== profile.id ? (
				<div className={styles.noPosts}>
					У {profile.name} на стене пока нет ни одной записи
				</div>
			) : (
				''
			)}
		</div>
	)
}

export default Profile
