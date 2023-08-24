interface IDate {
  day: string | number
  month: string | number
  year: string | number
  time: string | number
  shortDescription: string | null
  fullDateWithoutYear: string
  dayAndMonth: string
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
      dayAndMonth: ``,
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

  const dayAndMonth = `${day} ${monthString} ${year ? `${year}г` : ``}`

  const shortDescription: string | null = getShortDescr(parsedDate)

  return {
    day,
    month,
    year,
    time,
    shortDescription,
    fullDateWithoutYear,
    dayAndMonth,
  }
}

export function compareTwoStringDate(date1: string, date2: string) {
  if (!date1 || !date2)
    return { diffTime: -1, diffMinutes: -1, diffHours: -1, diffDays: -1 }

  const currentUtcDateString1 = date1.replace(`Z`, ``)
  const currentUtcDateString2 = date2.replace(`Z`, ``)
  const parsedDate1 = new Date(currentUtcDateString1)
  const parsedDate2 = new Date(currentUtcDateString2)

  const diffTime = Math.abs(parsedDate1.getTime() - parsedDate2.getTime())
  const diffHours = Math.floor(diffTime / 3600000)
  const diffDays = Math.abs(parsedDate1.getDate() - parsedDate2.getDate())

  return { diffTime, diffHours, diffDays }
}

export function isYesterday(date: Date | string) {
  if (typeof date === `string`) {
    const currentUtcDateString = date.replace(`Z`, ``)
    const parsedDate = new Date(currentUtcDateString)
    return isYesterday(parsedDate)
  }
  return new Date().getDate() - date.getDate() > 0 &&
    new Date().getDate() - date.getDate() < 2
    ? true
    : false
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
  const hour24 = 86400000 - 1

  const date = new Date(parsedDate)

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
  } else if (isYesterday(date)) {
    shortDescription = `Вчера в ${date.getHours()}:${date.getMinutes()}`
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
      "1": "минуту",
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
