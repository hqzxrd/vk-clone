import AuthHeader from "./AuthHeader"

import { FC } from "react"

import { useAuth } from "@/hooks/useAuth"

import styles from "./Header.module.scss"
import { NavLink } from "react-router-dom"

import logoLight from "@/assets/icons/logo/logoLight.svg"
import logoDark from "@/assets/icons/logo/logoDark.svg"
import { useTypedSelector } from "@/hooks/useTypedSelector"

const Header: FC = () => {
  const { isAuth } = useAuth()
  const { theme } = useTypedSelector((state) => state.theme)

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <NavLink className={styles.logo} to={isAuth ? `/` : `/login`}>
          <img src={theme === `light` ? logoLight : logoDark} alt="" />
        </NavLink>

        {isAuth ? (
          <AuthHeader />
        ) : (
          <>
            <NavLink className={styles.signin} to="/login">
              Войти
            </NavLink>
            <NavLink className={styles.register} to="/register#email">
              Регистрация
            </NavLink>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
