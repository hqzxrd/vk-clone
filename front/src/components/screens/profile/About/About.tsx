import AboutCount from '../AboutCount/AboutCount'

import styles from './About.module.scss'

const About = () => {
	return (
		<div className={styles.about}>
			<div className={styles.about_header}>
				<div className={styles.name}>Василий Абобович</div>
				<div className={styles.status}>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa?
				</div>
			</div>

			<div className={styles.about_field}>
				<div>Город:</div>
				<div>Бобруйск</div>
			</div>
			<div className={styles.about_field}>
				<div>Пол:</div>
				<div>Ламинат</div>
			</div>
			<div className={styles.about_field}>
				<div>Дата рождения:</div>
				<div>13.05.2023</div>
			</div>

			<div className={styles.info}>
				<AboutCount name="Друзей" value={1} />
				<AboutCount name="Постов" value={3} />
			</div>
		</div>
	)
}

export default About
