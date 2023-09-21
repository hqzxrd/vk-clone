import { useRef, useEffect } from "react"

const useTabTitle = (title: string, prevailOnUnmount = false) => {
  const defaultTitle = useRef(document.title)

  useEffect(() => {
    if (!title) document.title = defaultTitle.current
    document.title = title
  }, [title])

  useEffect(
    () => () => {
      if (!prevailOnUnmount) {
        document.title = defaultTitle.current
      }
    },
    []
  )
}

export default useTabTitle
