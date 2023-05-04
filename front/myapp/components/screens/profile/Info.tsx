import About from './About'
import Avatar from './Avatar'

import styles from './Info.module.scss'

const Info = () => {
	return (
		<div className={styles.profile}>
			<Avatar />
			<About />
		</div>
	)
}

export default Info
