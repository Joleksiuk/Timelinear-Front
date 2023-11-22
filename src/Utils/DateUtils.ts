import dayjs, { Dayjs } from 'dayjs'

export default {
    dayjsDateToString(date: Dayjs | null) {
        return date?.format('YYYY-MM-DD HH:mm:ss')
    },

    stringToDayjsDate(date: string) {
        return dayjs(date)
    },
}
