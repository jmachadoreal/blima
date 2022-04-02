import dayjs from 'dayjs'

export const getMoment = () => {
  const hours = dayjs().get('hours')

  return hours < 12 ? 'morn' : hours < 18 ? 'day' : hours < 21 ? 'eve' : 'night'
}
