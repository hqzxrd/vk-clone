import { useEffect, useState } from "react"

export const useCheckMobile = (size: number = 768) => {
  const [width, setWidth] = useState<number>(0)

  useEffect(() => {
    setWidth(window.innerWidth)
  }, [window.innerWidth])

  return width <= size
}
