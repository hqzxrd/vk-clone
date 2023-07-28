import { toast } from 'react-hot-toast'

const Error = (text: string) =>
	toast.error(text, {
		duration: 10000,
		style: {
			color: `white`,
			backgroundColor: `rgb(0, 0, 0, 0.5)`,
		},
	})

export default Error
