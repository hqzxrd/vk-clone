import { IAvatarMiniProps } from "./AvatarMini.interface"
import { FC } from "react"

import { FilesUrl } from "@/config/api.config"

import { useAvatarGenerate } from "@/hooks/useAvatarGenerate"

import { userLink } from "@/utils/user-link"

import styles from "./AvatarMini.module.scss"
import { NavLink } from "react-router-dom"
import OpenModalWrap from "@/components/wrappers/OpenModalWrap/OpenModalWrap"

const AvatarMini: FC<IAvatarMiniProps> = ({
  user,
  width,
  height,
  isLink,
  image,
  isOpen,
}) => {
  const color = useAvatarGenerate(user.name)

  if (image) {
    return (
      <div>
        <img
          src={image}
          width={width}
          height={height}
          alt="avatar"
          className={styles.avatar}
        />
      </div>
    )
  }

  if (user.avatar && isOpen && !isLink) {
    return (
      <OpenModalWrap
        renderElement={
          <img
            style={{ cursor: `pointer` }}
            src={`${FilesUrl(user?.avatar)}`}
            width={width}
            height={height}
            alt="avatar"
            className={styles.avatar}
          />
        }
      >
        <img src={`${FilesUrl(user?.avatar)}`} alt="avatar" />
      </OpenModalWrap>
    )
  }

  if (isLink) {
    return (
      <div>
        {user.avatar ? (
          <NavLink to={`/${userLink(user)}`}>
            <img
              src={`${FilesUrl(user?.avatar)}`}
              width={width}
              height={height}
              alt="avatar"
              className={styles.avatar}
            />
          </NavLink>
        ) : (
          <NavLink
            to={`/${userLink(user)}`}
            style={{
              backgroundColor: `${color}`,
              width: width,
              height: height,
              fontSize: width,
            }}
            className={styles.avatar}
          >
            <div>{user.name[0]}</div>
          </NavLink>
        )}
      </div>
    )
  } else {
    return (
      <div>
        {user.avatar ? (
          <div>
            <img
              src={`${FilesUrl(user?.avatar)}`}
              width={width}
              height={height}
              alt="avatar"
              className={styles.avatar}
            />
          </div>
        ) : (
          <div
            style={{
              backgroundColor: `${color}`,
              width: width,
              height: height,
              fontSize: width,
            }}
            className={styles.avatar}
          >
            <div>{user.name[0]}</div>
          </div>
        )}
      </div>
    )
  }
}

export default AvatarMini
