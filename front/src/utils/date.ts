interface IDate {
  day: string | number
  month: string | number
  year: string | number
  time: string | number
  shortDescription: string | null
  fullDateWithoutYear: string
}

interface IMorph {
  [index: string]: {
    [index: string]: string
  }
}

export function date(date: string): IDate | `` {
  if (!date)
    return {
      day: ``,
      month: ``,
      year: ``,
      time: ``,
      shortDescription: ``,
      fullDateWithoutYear: ``,
    }

  const currentUtcDateString = date.replace(`Z`, ``)
  const parsedDate = new Date(currentUtcDateString)

  const minutes = getNumberWithZero(parsedDate.getMinutes())

  const hours = getNumberWithZero(parsedDate.getHours())

  const day = getNumberWithZero(parsedDate.getDate())

  const month = getNumberWithZero(parsedDate.getMonth())

  const monthString = getMonth(parsedDate)

  const year =
    parsedDate.getFullYear() === new Date().getFullYear()
      ? ``
      : parsedDate.getFullYear()

  const time = `${hours}:${minutes}`

  const fullDateWithoutYear = `${day} ${monthString}${
    year ? `${year}г` : ``
  } в ${time}`

  const shortDescription: string | null = getShortDescr(parsedDate)

  return { day, month, year, time, shortDescription, fullDateWithoutYear }
}

function getMonth(date: Date) {
  const monthNumber = new Date(date).getMonth()

  const months = {
    0: `янв`,
    1: `фев`,
    2: `мар`,
    3: `апр`,
    4: `мая`,
    5: `июн`,
    6: `июл`,
    7: `авг`,
    8: `сен`,
    9: `окт`,
    10: `ноя`,
    11: `дек`,
  }

  return months[monthNumber]
}

function getShortDescr(parsedDate: Date) {
  const tenSeconds = 10000
  const oneMinute = 60000
  const oneHour = 3600000
  const hour24 = 86400000

  const diff = Math.abs(new Date(parsedDate.getTime() - Date.now()).getTime())
  const diffHours = new Date(diff).getUTCHours()
  const diffMinutes = new Date(diff).getUTCMinutes()
  let shortDescription: string | null = null

  if (diff < tenSeconds) {
    shortDescription = `Только что`
  } else if (diff < oneMinute) {
    shortDescription = `Минуту назад`
  } else if (diff < oneHour) {
    shortDescription = `${diffMinutes} ${dateMorph(
      diffMinutes,
      `minutes`
    )} назад`
  } else if (diff > oneHour && diff < hour24) {
    shortDescription = `${diffHours} ${dateMorph(diffHours, `hours`)} назад`
  } else {
    shortDescription = null
  }

  return shortDescription
}

function dateMorph(num: number, word: `minutes` | `hours`) {
  const extremeCases: IMorph = {
    minutes: {
      "11": "минут",
      "12": "минут",
      "13": "минут",
      "14": "минут",
    },
    hours: {
      "11": "часов",
      "12": "часов",
      "13": "часов",
      "14": "часов",
    },
  }

  if (extremeCases[word][num]) {
    return extremeCases[word][num]
  }

  const numberStr = num.toString()
  const number = numberStr[numberStr.length - 1]

  const endings: IMorph = {
    minutes: {
      "1": "минута",
      "2": "минуты",
      "3": "минуты",
      "4": "минуты",
      "5": "минут",
      "6": "минут",
      "7": "минут",
      "8": "минут",
      "9": "минут",
      "0": "минут",
    },
    hours: {
      "1": "час",
      "2": "часа",
      "3": "часа",
      "4": "часа",
      "5": "часов",
      "6": "часов",
      "7": "часов",
      "8": "часов",
      "9": "часов",
      "0": "часов",
    },
  }

  return endings[word][number]
}

function getNumberWithZero(num: number) {
  return num < 10 ? `0` + num : num
}
