import { FC, HTMLAttributes, useEffect, useRef } from 'react'

import styles from './DropDownWrap.module.scss'

interface props extends HTMLAttributes<HTMLDivElement> {
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
//помещать под кнопкой, которая активирует этот дропдаун
const DropDownWrap: FC<props> = ({ isOpen, setIsOpen, children, ...rest }) => {
	const dropdown = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const checkIfClickedOutside = (e: MouseEvent) => {
			if (!dropdown.current) {
				return
			}

			const target: Node = e.target as Node
			const button = dropdown.current.previousSibling
			const icon = dropdown.current.previousSibling?.lastChild

			if (target === button || target === icon || target.nodeName === 'path') {
				return
			}

			if (isOpen && dropdown.current && !dropdown.current.contains(target)) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', checkIfClickedOutside)

		return () => {
			document.removeEventListener('mousedown', checkIfClickedOutside)
		}
	}, [isOpen])

	return (
		<div
			ref={dropdown}
			style={{ display: isOpen ? 'block' : 'none' }}
			className={styles.dropdown}
		>
			<div {...rest}>{children}</div>
		</div>
	)
}

export default DropDownWrap
