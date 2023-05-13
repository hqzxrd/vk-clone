import CreatePost from './CreatePost/CreatePost'
import Info from './Info/Info'
import Post from './Post/Post'

import styles from './Profile.module.scss'

const posts = [
	{
		text: `qqqqqqqqqqqqqqqqqqqqqqqqqqqqq`,
		imgs: [`/avatar.jpg`, `/full3.jpg`],
	},
]

const Profile = () => {
	return (
		<div className={styles.wrapper}>
			<Info />
			<CreatePost />
			{posts.map(({ text, imgs }, i) => {
				return <Post text={text} imgs={imgs} key={imgs[i]} />
			})}
		</div>
	)
}

export default Profile
