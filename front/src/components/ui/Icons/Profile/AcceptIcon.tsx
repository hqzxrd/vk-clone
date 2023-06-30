import { FC, SVGProps } from 'react'

const AcceptIcon: FC<SVGProps<SVGSVGElement>> = ({ ...rest }) => {
	return (
		<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
			<g
				id="SVGRepo_tracerCarrier"
				stroke-linecap="round"
				stroke-linejoin="round"
			></g>
			<g id="SVGRepo_iconCarrier">
				<path
					d="M4 21V18.5C4 15.4624 6.46243 13 9.5 13H13.5M8 21V18M16 6.5C16 8.70914 14.2091 10.5 12 10.5C9.79086 10.5 8 8.70914 8 6.5C8 4.29086 9.79086 2.5 12 2.5C14.2091 2.5 16 4.29086 16 6.5ZM17.5 12.9998C17.0439 12.3927 16.3178 12 15.5 12C14.1193 12 13 13.1193 13 14.5C13 15.1195 13.2253 15.6864 13.5985 16.1231L17.5 21L21.4015 16.1231C21.7747 15.6864 22 15.1195 22 14.5C22 13.1193 20.8807 12 19.5 12C18.6822 12 17.9561 12.3927 17.5 12.9998Z"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1.4"
				></path>
			</g>
		</svg>
	)
}

export default AcceptIcon
