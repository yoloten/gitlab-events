export const normalizeDate = (date) => {
    const newDate = new Date(date)
    return newDate.toLocaleString("ru-RU").slice(0, 10)
}