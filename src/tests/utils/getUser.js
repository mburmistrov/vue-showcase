import { cloneDeep, flow } from 'lodash'
import { addDays, subDays } from '@/utils/date'

const defaultUser = Object.freeze({
  country: 'US',
  createdAt: '2018-07-12T18:44:58.880Z',
  email: 'example@example.com',
  id: 33,
  licenseValidUntil: null,
  locale: 'ru',
  name: 'John Doe'
})

function createUser() {
  return cloneDeep(defaultUser)
}

export function getUser(mixins = []) {
  return flow(createUser, ...mixins)()
}

export const withLicenseValidUntil = ({ date }) => user => {
  return {
    ...user,
    licenseValidUntil: date
  }
}
export const withValidLicense = withLicenseValidUntil({ date: addDays(new Date(), 10) })
export const withExpiredLicense = withLicenseValidUntil({ date: subDays(new Date(), 10) })
export const withoutLicense = withLicenseValidUntil({ date: null })
