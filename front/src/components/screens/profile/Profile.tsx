import CreatePost from './CreatePost/CreatePost'
import Info from './Info/Info'
import Post from './Post/Post'
import { IPost } from '@/types/post.types'
import { useRouter } from 'next/router'

import { useAuth } from '@/hooks/useAuth'
import { usePosts } from '@/hooks/usePosts'

import styles from './Profile.module.scss'

const Profile = () => {
	const { user } = useAuth()
	const { query } = useRouter()
	const { posts } = usePosts(`?user=${query.id}`)

	return (
		<div className={styles.wrapper}>
			<Info />
			{user.id === +query.id! && <CreatePost />}

			{posts &&
				posts[0].map((post: IPost) => {
					return <Post post={post} key={post.id} />
				})}
		</div>
	)
}

export default Profile
