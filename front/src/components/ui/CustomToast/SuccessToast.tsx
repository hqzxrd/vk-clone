import { toast } from 'react-hot-toast'

const Success = (text: string) =>
	toast.success(text, {
		duration: 3000,
		style: {
			color: `white`,
			backgroundColor: `rgb(0, 0, 0, 0.5)`,
		},
	})

export default Success
