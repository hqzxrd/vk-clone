import LoginForm from "@/components/screens/authForm/LoginForm"
import { Route, Routes } from "react-router-dom"
import Profile from "./components/screens/profile/Profile"
import Peoples from "./components/screens/peoples/Peoples"
import Friends from "./components/screens/friends/Friends"
import Messanger from "./components/screens/messanger/Messanger"
import News from "./components/screens/news/News"
import CreateUserWrapper from "./components/screens/authForm/CreateUserWrapper"
import UserDialog from "./components/screens/messanger/UserDialog/UserDialog"
import Home from "./components/screens/home/Home"
import AuthProvider from "./providers/AuthProvider/AuthProvider"
import NotFound from "./components/screens/errors/404/404Component"
import ProfileEdit from "./components/screens/profileEdit/profileEdit"
import { useTypedSelector } from "./hooks/useTypedSelector"
import { useEffect } from "react"

const App = () => {
  const { theme } = useTypedSelector((state) => state.theme)

  useEffect(() => {
    document.body.setAttribute(`data-theme`, theme)
  }, [theme])

  return (
    <Routes>
      <Route
        path="*"
        element={
          <AuthProvider>
            <NotFound />
          </AuthProvider>
        }
      />
      <Route
        path="/"
        element={
          <AuthProvider>
            <News />
          </AuthProvider>
        }
      />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<CreateUserWrapper />} />
      <Route
        path="/:userId"
        element={
          <AuthProvider>
            <Profile />
          </AuthProvider>
        }
        errorElement={<NotFound />}
      />
      <Route
        path="/edit"
        element={
          <AuthProvider>
            <ProfileEdit />
          </AuthProvider>
        }
      />
      <Route
        path="/messanger"
        element={
          <AuthProvider>
            <Messanger />
          </AuthProvider>
        }
      />
      <Route
        path="/chat/:userId"
        element={
          <AuthProvider>
            <UserDialog />
          </AuthProvider>
        }
      />
      <Route
        path="/friends"
        element={
          <AuthProvider>
            <Friends />
          </AuthProvider>
        }
      />
      <Route
        path="/peoples"
        element={
          <AuthProvider>
            <Peoples />
          </AuthProvider>
        }
      />
    </Routes>
  )
}

export default App
