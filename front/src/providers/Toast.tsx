import { FC } from 'react'
import toast, { Toaster } from 'react-hot-toast'

export const notify = () => toast('Here is your toast.')

const Toast: FC = () => {
	return <Toaster position="bottom-left" />
}

export default Toast
