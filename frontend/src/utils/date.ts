import dayjs from 'dayjs'

export const formatTimestamp = (timestamp?: string, format?: string) => {
    if (!timestamp) return ''
    const timestampNum = parseInt(timestamp, 10)
    return dayjs(timestampNum).format(format || 'DD/MM/YYYY')
}
