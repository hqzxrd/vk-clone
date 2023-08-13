import IChildren from "@/utils/children.inteface"
import React, { FC, useState } from "react"

import ModalWrap from "../ModalWrap/ModalWrap"

import styles from "./OpenModalWrap.module.scss"

interface props extends IChildren {
  renderElement: React.ReactElement
}

const OpenModalWrap: FC<props> = ({ renderElement, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div
        style={{ cursor: `pointer` }}
        className={styles.wrap}
        onClick={() => setIsOpen(true)}
      >
        {renderElement}
      </div>
      <ModalWrap isOpen={isOpen} setIsOpen={setIsOpen}>
        {children}
      </ModalWrap>
    </>
  )
}

export default OpenModalWrap
