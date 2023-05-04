import { RefObject } from 'react'

export const setTheme = (ref: RefObject<HTMLDivElement>): void => {
	if (!ref) {
		return
	}

	const currentTheme = ref.current?.style.getPropertyValue(`--primary-color`)

	if (currentTheme === `#e0ffff`) {
		ref.current?.style.setProperty(`--primary-color`, `#000`)
		ref.current?.style.setProperty(`--primary-background`, `#edeef0`)
		ref.current?.style.setProperty(`--extra-background`, `#ffffff`)
		ref.current?.style.setProperty(`--primary-border`, `#dce1e6`)
		ref.current?.style.setProperty(`--primary-hover`, `#f5f6f8`)
	} else {
		ref.current?.style.setProperty(`--primary-color`, `#e0ffff`)
		ref.current?.style.setProperty(`--primary-background`, `#141414`)
		ref.current?.style.setProperty(`--extra-background`, `#222222`)
		ref.current?.style.setProperty(`--primary-border`, `#424242`)
		ref.current?.style.setProperty(`--primary-hover`, `#323232`)
	}
}
