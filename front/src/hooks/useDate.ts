export const useDate = (date: string) => {
	const onlyDate = date.split(`T`)[0].split(`-`)
	const day = onlyDate[2]
	const month = onlyDate[1]
	const year = onlyDate[0]

	return { day, month, year }
}
