export function date(date: string) {
  if (!date) return ``
  const onlyDate = date.split(`T`)[0].split(`-`)
  let onlyTime = null

  const day = onlyDate[2]
  const month = onlyDate[1]
  const year = onlyDate[0]
  let time = null

  if (date.split(`T`)[1]) {
    onlyTime = date.split(`T`)[1].split(`-`)
    time = onlyTime[0].split(`.`)[0]
  }

  return { day, month, year, time }
}
