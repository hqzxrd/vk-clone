import { RefObject, useEffect, useState } from 'react'

/**
 * Хук который меняет тему, просто нужно передать в него реф на лейаут и вызывать тоггл при клике на какую либо кнопку
 * @returns {theme} theme - Текущая тема
 * @returns {toggle} toggle - Тоггл темы
 */
export const useDarkTheme = (ref: RefObject<HTMLDivElement>) => {
	const [theme, setTheme] = useState<boolean>(false)

	function toggle() {
		setTheme(!theme)
	}

	useEffect(() => {
		console.log(`aboba`)

		if (!ref.current?.style) {
			return
		}
		if (!theme) {
			ref.current.style.setProperty(`--primary-color`, `#000`)
			ref.current.style.setProperty(`--primary-background`, `#edeef0`)
			ref.current.style.setProperty(`--extra-background`, `#ffffff`)
			ref.current.style.setProperty(`--primary-border`, `#dce1e6`)
			ref.current.style.setProperty(`--primary-hover`, `#f5f6f8`)
			ref.current.style.setProperty(`--primary-scroll`, `#B5B8B1`)
			ref.current.style.setProperty(`--primary-button`, `#447bba`)
			ref.current.style.setProperty(`--primary-button-color`, `white`)
		} else {
			ref.current.style.setProperty(`--primary-color`, `#e0ffff`)
			ref.current.style.setProperty(`--primary-background`, `#141414`)
			ref.current.style.setProperty(`--extra-background`, `#222222`)
			ref.current.style.setProperty(`--primary-border`, `#424242`)
			ref.current.style.setProperty(`--primary-hover`, `#323232`)
			ref.current.style.setProperty(`--primary-scroll`, `#222222`)
			ref.current.style.setProperty(`--primary-button`, `white`)
			ref.current.style.setProperty(`--primary-button-color`, `black`)
		}
	}, [theme])

	return { theme, toggle }
}
