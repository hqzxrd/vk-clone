import About_Count from './AboutCount'

import styles from './About.module.scss'

const About = () => {
	return (
		<div className={styles.about}>
			<div className={styles.name}>Василий Абобович</div>
			<div className={styles.status}>Лютейший статус галактики</div>
			<div className={styles.city}>
				<span>Город:</span> где то там
			</div>
			<div className={styles.floorKappa}>
				<span>Пол:</span> какой то там
			</div>
			<div className={styles.info}>
				<About_Count name="Друзей" value={1} />
				<About_Count name="Постов" value={3} />
			</div>
		</div>
	)
}

export default About
