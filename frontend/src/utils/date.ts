import dayjs from 'dayjs'

export const getDateFromTimeStamp = ({
    timestamp,
    format,
}: {
    timestamp: string
    format?: string
}) => {
    return dayjs(timestamp).format(format || 'DD/MM/YYYY')
}
