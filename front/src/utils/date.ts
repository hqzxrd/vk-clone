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
  if (!date) return ``

  const currentUtcDateString = date.replace(`Z`, ``)

  const parsedDate = new Date(currentUtcDateString)

  const day =
    parsedDate.getDate() < 10
      ? `0` + parsedDate.getDate()
      : parsedDate.getDate()

  const month =
    parsedDate.getMonth() + 1 < 10
      ? `0` + parsedDate.getMonth()
      : parsedDate.getMonth()

  const year =
    parsedDate.getFullYear() !== new Date().getFullYear()
      ? parsedDate.getFullYear()
      : ``

  const time = `${parsedDate.getHours()}:${parsedDate.getMinutes()}`

  const fullDateWithoutYear = `${day}.${month}${
    year ? `.${year}` : ``
  } в ${time}`

  const diff = Math.abs(new Date(parsedDate.getTime() - Date.now()).getTime())
  const diffHours = new Date(diff).getHours()
  const diffMinutes = new Date(diff).getMinutes()
  let shortDescription: string | null = null

  if (diff < 10000) {
    shortDescription = `Только что`
  } else if (diff < 60000) {
    shortDescription = `Минуту назад`
  } else if (diff < 3600000) {
    shortDescription = `${diffMinutes} ${dateMorph(
      diffMinutes,
      `minutes`
    )} назад`
  } else if (diff > 3600000 && diff < 86400000) {
    shortDescription = `${diffHours} ${dateMorph(diffHours, `hours`)} назад`
  } else {
    shortDescription = null
  }

  return { day, month, year, time, shortDescription, fullDateWithoutYear }
}

function dateMorph(num: number, word: `minutes` | `hours`) {
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
