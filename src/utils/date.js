import {
  differenceInDays as dfDiffInDays,
  isAfter as dfIsAfter,
  addDays as dfAddDays,
  subDays as dfSubDays,
  format as dfFormat
} from 'date-fns'

export function diffInDays(dateLeft, dateRight) {
  return dfDiffInDays(dateLeft, dateRight)
}

export function isDateAfter(date, dateToCompare) {
  return dfIsAfter(date, dateToCompare)
}

export function addDays(date, amount) {
  return dfAddDays(date, amount)
}

export function subDays(date, amount) {
  return dfSubDays(date, amount)
}

export function format(date, format = 'dd.MM.yyyy') {
  return dfFormat(date, format)
}
