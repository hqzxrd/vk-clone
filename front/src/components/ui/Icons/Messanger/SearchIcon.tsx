import { FC, SVGProps } from 'react'

const SearchIcon: FC<SVGProps<SVGSVGElement>> = ({ ...rest }) => {
	return (
		<svg viewBox="0 0 24 24" fill="none">
			<g strokeWidth="0"></g>
			<g strokeLinecap="round" strokeLinejoin="round"></g>
			<g>
				<path
					opacity="0.1"
					d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
					fill="#696969"
				></path>
				<path
					d="M15 15L21 21"
					stroke="#696969"
					stroke-width="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				></path>
				<path
					d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
					stroke="#696969"
					strokeWidth="2"
				></path>
			</g>
		</svg>
	)
}

export default SearchIcon
