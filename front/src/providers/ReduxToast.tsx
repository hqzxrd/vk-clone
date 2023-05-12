import { FC } from 'react'
import ReduxToastr from 'react-redux-toastr'

const ReduxToast: FC = () => {
	return (
		<ReduxToastr
			timeOut={4000}
			newestOnTop={false}
			position="bottom-left"
			transitionIn="fadeIn"
			transitionOut="fadeOut"
			progressBar
		/>
	)
}

export default ReduxToast
