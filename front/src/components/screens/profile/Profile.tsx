import CreatePost from './CreatePost/CreatePost'
import Info from './Info/Info'
import Post from './Post/Post'
import { IPost } from '@/types/post.types'
import { useRouter } from 'next/router'

import { useAuth } from '@/hooks/useAuth'
import { usePosts } from '@/hooks/usePosts'
import { useProfile } from '@/hooks/useProfile'

import styles from './Profile.module.scss'

const Profile = () => {
	const { user } = useAuth()
	const { profile } = useProfile()
	const { query } = useRouter()
	const { posts } = usePosts(`?user=${query.id}`)

	if (!profile || !posts) {
		return
	}

	return (
		<div className={styles.wrapper}>
			<Info />
			{user.id === +query.id! && <CreatePost />}

			{posts &&
				posts[0].map((post: IPost) => {
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
