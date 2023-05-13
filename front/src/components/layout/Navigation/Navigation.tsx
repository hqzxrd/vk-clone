import Link from 'next/link'
import { FC } from 'react'

import style from './Navigation.module.scss'

const Navigation: FC = () => {
	return (
		<div className={style.nav_wrapper}>
			<nav>
				<Link href="/users/profile">
					<div>
						<div className={style.icon}>
							<svg
								fill="none"
								height="20"
								viewBox="0 0 20 20"
								width="20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									clipRule="evenodd"
									d="M5.84 15.63a6.97 6.97 0 0 0 8.32 0 8.2 8.2 0 0 0-8.32 0zM4.7 14.57a7 7 0 1 1 10.6 0 9.7 9.7 0 0 0-10.6 0zM10 1.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17zm-1.5 7a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0zm1.5-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"
									fill="currentColor"
									fillRule="evenodd"
								></path>
							</svg>
						</div>
						<div>Моя страница</div>
					</div>
				</Link>
				<Link href="/messanger">
					<div>
						<div className={style.icon}>
							<svg
								width="20"
								height="20"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g
									id="message_outline_20__Page-2"
									stroke="none"
									strokeWidth="1"
									fill="none"
									fillRule="evenodd"
								>
									<g id="message_outline_20__message_outline_20">
										<path
											id="message_outline_20__Shape"
											opacity=".4"
											d="M0 0h20v20H0z"
										></path>
										<path
											d="M6.83 15.75c.2-.23.53-.31.82-.2.81.3 1.7.45 2.6.45 3.77 0 6.75-2.7 6.75-6s-2.98-6-6.75-6S3.5 6.7 3.5 10c0 1.21.4 2.37 1.14 3.35.1.14.16.31.15.49-.04.76-.4 1.78-1.08 3.13 1.48-.11 2.5-.53 3.12-1.22ZM3.24 18.5a1.2 1.2 0 0 1-1.1-1.77A10.77 10.77 0 0 0 3.26 14 7 7 0 0 1 2 10c0-4.17 3.68-7.5 8.25-7.5S18.5 5.83 18.5 10s-3.68 7.5-8.25 7.5c-.92 0-1.81-.13-2.66-.4-1 .89-2.46 1.34-4.35 1.4Z"
											id="message_outline_20__Icon-Color"
											fill="currentColor"
											fillRule="nonzero"
										></path>
									</g>
								</g>
							</svg>
						</div>

						<div>Мессенджер</div>
					</div>
				</Link>
				<Link href="/friends">
					<div>
						<div className={style.icon}>
							<svg
								width="20"
								height="20"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g
									id="message_outline_20__Page-2"
									stroke="none"
									strokeWidth="1"
									fill="none"
									fillRule="evenodd"
								>
									<g id="message_outline_20__message_outline_20">
										<path
											id="message_outline_20__Shape"
											opacity=".4"
											d="M0 0h20v20H0z"
										></path>
										<path
											d="M6.83 15.75c.2-.23.53-.31.82-.2.81.3 1.7.45 2.6.45 3.77 0 6.75-2.7 6.75-6s-2.98-6-6.75-6S3.5 6.7 3.5 10c0 1.21.4 2.37 1.14 3.35.1.14.16.31.15.49-.04.76-.4 1.78-1.08 3.13 1.48-.11 2.5-.53 3.12-1.22ZM3.24 18.5a1.2 1.2 0 0 1-1.1-1.77A10.77 10.77 0 0 0 3.26 14 7 7 0 0 1 2 10c0-4.17 3.68-7.5 8.25-7.5S18.5 5.83 18.5 10s-3.68 7.5-8.25 7.5c-.92 0-1.81-.13-2.66-.4-1 .89-2.46 1.34-4.35 1.4Z"
											id="message_outline_20__Icon-Color"
											fill="currentColor"
											fillRule="nonzero"
										></path>
									</g>
								</g>
							</svg>
						</div>

						<div>Друзья</div>
					</div>
				</Link>
			</nav>
		</div>
	)
}

export default Navigation
