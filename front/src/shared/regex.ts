export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const YEAR_REGEX = /^(19[2-9]\d|20[0-1]\d|202[0-3])$/

export const NAME_REGEX = /^[a-zA-Zа-яА-Я]+$/g

export const NICKNAME_REGEX = /^[a-zA-ZА-Яа-я][0-9a-zA-ZА-Яа-я]*$/

export const isEpmtyString = (str: string) => {
  return /\S/g.test(str)
}
