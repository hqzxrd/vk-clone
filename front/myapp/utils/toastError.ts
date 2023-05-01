import { toastr } from 'react-redux-toastr'

export const toastError = (error: any, title?: string) => {
	const message =
		error.response && error.response.data
			? typeof error.response.data.message === 'object'
				? error.response.data.message[0]
				: error.response.data.message
			: error.message
	console.log(error)

	toastr.error(title || `${error.response.status}` || `Ошибка`, message)
	throw message
}
