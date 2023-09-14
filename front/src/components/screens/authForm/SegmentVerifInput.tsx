import React, { Dispatch, FC, SetStateAction, useRef, useState } from "react"

import styles from "./AuthForm.module.scss"

interface props {
  code: string
  setCode: Dispatch<SetStateAction<string>>
}

const SegmentVerifInput: FC<props> = ({ code, setCode }) => {
  const codeInputRefs = Array.from({ length: 6 }).map(() =>
    useRef<HTMLInputElement>(null)
  )

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value
    setCode((prevCode: string) => {
      const newCode = prevCode.split("")
      newCode[index] = value.slice(-1)
      return newCode.join("")
    })

    if (value !== "") {
      if (index < codeInputRefs.length - 1) {
        codeInputRefs[index + 1].current!.focus()
      }
    }
  }

  const hanlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    codeInputRefs.forEach((ref, i) => {
      if (!ref.current) return
      const num = e.clipboardData.getData(`text`)[i]
      ref.current.value = num ? num : ``
      num && ref.current.focus()
    })
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (
      e.key === "Backspace" &&
      index > 0 &&
      codeInputRefs[index].current!.value === ""
    ) {
      codeInputRefs[index - 1].current!.focus()
    }
  }

  return (
    <div className={styles.segmentInput}>
      {codeInputRefs.map((ref, index) => (
        <input
          key={index}
          ref={ref}
          type="text"
          maxLength={1}
          value={code[index] || ""}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={(e) => hanlePaste(e)}
        />
      ))}
    </div>
  )
}

export default SegmentVerifInput
