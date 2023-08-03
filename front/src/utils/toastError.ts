import Error from '@/components/ui/CustomToast/ErrorToast'

export const toastError = (error: any) => {
	const message: string =
		error.response && error.response.data
			? typeof error.response.data.message === 'object'
				? error.response.data.message[0]
				: error.response.data.message
			: error.message

	if (message === `Unauthorized`) return

	Error(message)
	throw Error(message)
}
