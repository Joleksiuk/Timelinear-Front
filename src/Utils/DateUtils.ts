import dayjs, { Dayjs } from 'dayjs'

export default {
    dayjsDateToString(date: Dayjs | null): string {
        if (date === null) {
            return ''
        }
        return date?.format('YYYY-MM-DD HH:mm:ss')
    },

    stringToDayjsDate(date: string) {
        return dayjs(date)
    },
}
