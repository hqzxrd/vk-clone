import { IUpdateFields, IUpdateFieldsDto } from "./profileEdit.interface"
import { UserService } from "@/services/user/user.service"
import { TypeGender } from "@/types/auth.types"
import { FC, MouseEvent, useRef, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useQueryClient } from "react-query"

import AvatarMini from "@/components/ui/AvatarMini/AvatarMini"
import BirthDateFields from "@/components/ui/BirthDateFields/BirthDateFields"
import Button from "@/components/ui/Form/Button"
import Input from "@/components/ui/Form/Input"
import GenderSelector from "@/components/ui/GenderSelector/GenderSelector"

import { useAuth } from "@/hooks/useAuth"
import usePhotos from "@/hooks/usePhoto"

import { NAME_REGEX, NICKNAME_REGEX } from "@/shared/regex"

import { store } from "@/store/store"
import { deleteAvatar } from "@/store/user/user.action"

import styles from "./profileEdit.module.scss"
import { useNavigate } from "react-router-dom"
import Error from "@/components/ui/CustomToast/ErrorToast"
import Success from "@/components/ui/CustomToast/SuccessToast"
import useTabTitle from "@/hooks/useTabTitle"

const ProfileEdit: FC = () => {
  useTabTitle(`Редактировать`)
  const [nickname, setNickname] = useState<string>()
  const inputFiles = useRef<HTMLInputElement>(null)
  const nav = useNavigate()
  const { user } = useAuth()

  const [gender, setGender] = useState<TypeGender>(user.gender || `male`)
  const { file, avatar, setAvatar, handleChange } = usePhotos()
  const queryClient = useQueryClient()

  const {
    register: reg,
    handleSubmit,
    formState,
  } = useForm<IUpdateFields>({
    mode: `onChange`,
    defaultValues: {
      name: user.name,
      surname: user.surname,
      status: user.status !== `null` ? user.status : ``,
      city: user.city !== `null` ? user.city : ``,
      nickname: +user.nickname === user.id ? `` : user.nickname,
    },
  })

  const onSubmit: SubmitHandler<IUpdateFields> = async (data) => {
    const modifiedDay = +data.day < 10 ? `0${+data.day}` : data.day
    const modifiedMonth = +data.month < 10 ? `0${+data.month}` : data.month

    const birthday = `${data.year}-${modifiedMonth}-${modifiedDay}`

    const userDto: IUpdateFieldsDto = {
      id: user.id,
      name: data.name,
      surname: data.surname,
      city: data.city,
      status: data.status,
      nickname: data.nickname,
      birthday,
      gender,
    }

    const res = await UserService.updateProfile(userDto, file)

    if (res && res.status === 200) {
      nav(`/${data.nickname ? data.nickname : user.id}`, { replace: true })
    }
  }

  const handleClickDeleteAvatar = async () => {
    setAvatar(``)
    const result = await store.dispatch(deleteAvatar())

    if (result.meta.requestStatus === "fulfilled") {
      queryClient.invalidateQueries([`profile`, user.id])
    }
  }

  const copy = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    const text = e.currentTarget.textContent

    if (!text) {
      return
    }

    if (!navigator.clipboard) {
      Error(`Ошибка копирования`)
    }

    navigator.clipboard
      .writeText(text)
      .then(() => {
        Success(`Скопировано`)
      })
      .catch(() => {
        Error(`Ошибка копирования`)
      })
  }

  return (
    <section className={styles.auth}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.head}>Редактирование профиля</div>
        <div className={styles.line1}>
          <div className={styles.avatar}>
            <AvatarMini
              user={user}
              width={140}
              height={140}
              isLink={false}
              image={avatar}
            />
            <input
              onChange={(e) => handleChange(e)}
              style={{ display: "none" }}
              type="file"
              accept=".jpg,.jpeg"
              ref={inputFiles}
            />
          </div>
          <div className={styles.line1Actions}>
            <div className={styles.avatarActions}>
              <Button type="button" onClick={() => inputFiles.current?.click()}>
                Изменить
              </Button>
              <Button type="button" onClick={() => handleClickDeleteAvatar()}>
                Удалить
              </Button>
            </div>

            <GenderSelector gender={gender} setGender={setGender} />
          </div>
        </div>

        <div className={styles.line2}>
          <div>
            <label>Имя</label>
            <Input
              placeholder="Имя"
              {...reg(`name`, {
                pattern: {
                  value: NAME_REGEX,
                  message: `Только ru или en буквы`,
                },
                required: `Введите имя`,
                maxLength: { value: 15, message: `Максимум 15 символов` },
                minLength: { value: 2, message: `Минимум 2 символа` },
              })}
              error={formState.errors.name}
            />
          </div>

          <div>
            <label>Фамилия</label>
            <Input
              placeholder="Фамилия"
              {...reg(`surname`, {
                pattern: {
                  value: NAME_REGEX,
                  message: `Только ru или en буквы`,
                },
                required: `Введите фамилию`,
                maxLength: { value: 15, message: `Максимум 15 символов` },
                minLength: { value: 2, message: `Минимум 2 символа` },
              })}
              error={formState.errors.surname}
            />
          </div>
        </div>

        <div className={styles.line3}>
          <label>Статус</label>
          <div className={styles.line4Wrap}>
            <Input
              placeholder="Статус"
              {...reg(`status`)}
              maxLength={64}
              error={formState.errors.status}
            />
          </div>
        </div>

        <div className={styles.line4}>
          <div>
            <label>Город</label>
            <Input
              placeholder="Город"
              {...reg(`city`)}
              maxLength={20}
              error={formState.errors.city}
            />
            <label>Дата рождения</label>
            <BirthDateFields formState={formState} reg={reg} />
          </div>

          <div>
            <label>Никнейм</label>
            <Input
              placeholder="Никнейм"
              {...reg(`nickname`, {
                pattern: {
                  value: NICKNAME_REGEX,
                  message: `Недопустимый никнейм`,
                },
              })}
              maxLength={20}
              onChange={(e) => setNickname(e.currentTarget.value)}
              error={formState.errors.nickname}
            />
            <div className={styles.link} onClick={(e) => copy(e)}>
              {import.meta.env.VITE_CLIENT_URL}/
              {nickname ? nickname : user.nickname}
            </div>
          </div>
        </div>
        <div className={styles.line5}>
          <Button type="button">Сменить пароль</Button>
          <Button>Сохранить</Button>
        </div>
      </form>
    </section>
  )
}

export default ProfileEdit
