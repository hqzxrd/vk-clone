import { FC, useState } from "react"
import styles from "./Slider.module.scss"
import { FilesUrl } from "@/config/api.config"
import ArrowIcon from "../Icons/ArrowIcon"
import cn from "classnames"

interface props {
  photos: string[]
  currentSlide?: number
}

const Slider: FC<props> = ({ photos, currentSlide }) => {
  const [slide, setSlide] = useState<number>(currentSlide ? currentSlide : 0)
  console.log(slide)

  const minus = () => {
    setSlide((prev) => (prev - 1 >= 0 ? prev - 1 : prev))
  }

  const plus = () => {
    setSlide((prev) => (prev + 1 < photos.length ? prev + 1 : prev))
  }

  if (photos.length <= 1) {
    return (
      <div className={styles.slider}>
        <div className={styles.pic}>
          <img src={FilesUrl(`${photos[slide]}`)} alt="pic" />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.slider}>
      {slide > 0 && (
        <div className={cn(styles.button, styles.left)} onClick={() => minus()}>
          <div>
            <ArrowIcon />
          </div>
        </div>
      )}

      <div className={styles.pic}>
        <img src={FilesUrl(`${photos[slide]}`)} alt="pic" />
      </div>

      {slide + 1 < photos.length && (
        <div className={cn(styles.button, styles.right)} onClick={() => plus()}>
          <div>
            <ArrowIcon />
          </div>
        </div>
      )}
    </div>
  )
}

export default Slider
