import { AuthService } from "@/services/auth/auth.service"
import { UserService } from "@/services/user/user.service"
import {
  ICodeEmailDto,
  ILoginFields,
  ILoginRegisterResponse,
  IRegisterFieldsDto,
} from "@/types/auth.types"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-hot-toast"

import Success from "@/components/ui/CustomToast/SuccessToast"

import { toastError } from "@/utils/toastError"

export const confirmation = createAsyncThunk<
  { status: number; email: string },
  { email: string }
>(`auth/confirmation`, async ({ email }, thunkApi) => {
  try {
    const res = await AuthService.confirmation(email)

    return { status: res?.status, email }
  } catch (error) {
    toastError(error)
    return thunkApi.rejectWithValue(error)
  }
})

export const code = createAsyncThunk<number, ICodeEmailDto>(
  `auth/code`,
  async ({ code, email }, thunkApi) => {
    try {
      const res = await AuthService.code(code, email)

      return res?.status
    } catch (error) {
      toastError(error)
      return thunkApi.rejectWithValue(error)
    }
  }
)

export const register = createAsyncThunk<
  ILoginRegisterResponse,
  IRegisterFieldsDto
>(`auth/registration`, async (user, thunkApi) => {
  try {
    const res = await AuthService.register(user)
    Success("Регистрация")

    return res.data
  } catch (error) {
    toastError(error)
    return thunkApi.rejectWithValue(error)
  }
})

export const login = createAsyncThunk<ILoginRegisterResponse, ILoginFields>(
  `auth/login`,
  async ({ email, password }, thunkApi) => {
    try {
      const res = await AuthService.login(email, password)
      Success("Вход в систему")

      return res.data
    } catch (error) {
      toastError(error)
      return thunkApi.rejectWithValue(error)
    }
  }
)

export const logout = createAsyncThunk(`auth/logout`, () => {
  AuthService.logout()
})

export const getNewsTokens = createAsyncThunk<ILoginRegisterResponse>(
  `auth/check-auth`,
  async (_, thunkApi) => {
    try {
      const res = await AuthService.getNewsTokens()
      return res.data
    } catch (error) {
      toastError(error)
      return thunkApi.rejectWithValue(error)
    }
  }
)

export const deleteAvatar = createAsyncThunk<ILoginRegisterResponse>(
  `user/deleteAvatar`,
  async (_, thunkApi) => {
    try {
      const res = await UserService.deleteAvatar()
      return res.data
    } catch (error) {
      toastError(error)
      return thunkApi.rejectWithValue(error)
    }
  }
)
