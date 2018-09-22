import {isDate,isValid,isFuture,differenceInYears, parse} from 'date-fns'

export const isValidDate = (dateStr: string): boolean => {
    const date = parse(dateStr)
    return isDate(date)
        && isValid(date)
        && !isFuture(date)
        && differenceInYears(Date.now(), date) < 150
}