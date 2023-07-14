import { FC, SVGProps } from 'react'

const DeleteFriendIcon: FC<SVGProps<SVGSVGElement>> = ({ ...rest }) => {
	return (
		<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
			<g
				id="SVGRepo_tracerCarrier"
				strokeLinecap="round"
				strokeLinejoin="round"
			></g>
			<g id="SVGRepo_iconCarrier">
				<path
					d="M4 21V18.5C4 15.4624 6.46243 13 9.5 13H14.5M16 16.5H19M8 21V18M16 6.5C16 8.70914 14.2091 10.5 12 10.5C9.79086 10.5 8 8.70914 8 6.5C8 4.29086 9.79086 2.5 12 2.5C14.2091 2.5 16 4.29086 16 6.5ZM22 16.5C22 18.9853 19.9853 21 17.5 21C15.0147 21 13 18.9853 13 16.5C13 14.0147 15.0147 12 17.5 12C19.9853 12 22 14.0147 22 16.5Z"
					stroke="currentColor"
					strokeLinecap="round"
					strokeWidth="1.4"
				></path>
			</g>
		</svg>
	)
}

export default DeleteFriendIcon
