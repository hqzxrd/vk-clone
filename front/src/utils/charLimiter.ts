export const stringLimiter = (text: string, limit: number) => {
  if (text.length <= limit) return text

  return text.slice(0, limit) + `...`
}
