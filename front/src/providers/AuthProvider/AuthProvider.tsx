import Cookies from "js-cookie"
import { FC, useEffect } from "react"

import IChildren from "@/utils/children.inteface"
import { useActions } from "@/hooks/useActions"

import { AuthService } from "@/services/auth/auth.service"
import { useDispatch } from "react-redux"
import { setAuthIsTrue } from "@/store/user/user.slice"
import { useAuth } from "@/hooks/useAuth"
import { Navigate } from "react-router-dom"
import { setAuthStore } from "@/utils/local-storage"

const AuthProvider: FC<IChildren> = ({ children }) => {
  const { isAuth } = useAuth()
  const { logout } = useActions()
  const dispatch = useDispatch()
  console.log(isAuth)

  useEffect(() => {
    async function check() {
      const accessToken = Cookies.get(`AccessToken`)

      if (!accessToken) {
        const res = await AuthService.getNewsTokens()
        console.log(res)

        if (res.status === 401) logout()
      }
      setAuthStore(true)
      dispatch(setAuthIsTrue())
    }

    check()
  }, [])

  if (!isAuth) {
    return <Navigate to="/login" replace={true} />
  }

  return children
}

export default AuthProvider
