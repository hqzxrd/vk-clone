import { Navigate, useLocation, useNavigate } from "react-router-dom"
import RegisterCodeForm from "./RegisterCodeForm"
import RegisterEmailForm from "./RegisterEmailForm"
import RegisterInfoForm from "./RegisterInfoForm"
import RegisterPasswordForm from "./RegisterPasswordForm"
import { IRegisterFields } from "./auth.interface"

import { useEffect, useState } from "react"
import {
  FormState,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
  useForm,
} from "react-hook-form"
import { useAuth } from "@/hooks/useAuth"

interface IPages {
  [page: string]: (
    reg: UseFormRegister<IRegisterFields>,
    handleSubmit: UseFormHandleSubmit<IRegisterFields>,
    formState: FormState<IRegisterFields>,
    watch: UseFormWatch<IRegisterFields>
  ) => JSX.Element
}

const pages: IPages = {
  "#email": (reg, handleSubmit, formState) => (
    <RegisterEmailForm
      reg={reg}
      handleSubmit={handleSubmit}
      formState={formState}
    />
  ),

  "#code": (reg, handleSubmit, formState) => (
    <RegisterCodeForm
      reg={reg}
      handleSubmit={handleSubmit}
      formState={formState}
    />
  ),

  "#password": (reg, handleSubmit, formState, watch) => (
    <RegisterPasswordForm
      reg={reg}
      handleSubmit={handleSubmit}
      formState={formState}
      watch={watch}
    />
  ),

  "#info": (reg, handleSubmit, formState) => (
    <RegisterInfoForm
      reg={reg}
      handleSubmit={handleSubmit}
      formState={formState}
    />
  ),
}

const CreateUserWrapper = () => {
  const nav = useNavigate()
  const { hash } = useLocation()
  const [state, setState] = useState<string>(``)
  const { isAuth, user } = useAuth()

  useEffect(() => {
    if (
      hash === `#email` ||
      hash === `#code` ||
      hash === `#password` ||
      hash === `#info`
    )
      setState(hash)
  }, [hash])

  useEffect(() => {
    nav(`/register#email`, { replace: true })
  }, [])

  const {
    register: reg,
    handleSubmit,
    formState,
    watch,
  } = useForm<IRegisterFields>({
    mode: `onChange`,
  })
  console.log(state)

  if (!state) {
    return <Navigate to="/register#email" />
  }

  if (isAuth) return <Navigate to="/" />

  return pages[state](reg, handleSubmit, formState, watch)
}

export default CreateUserWrapper
